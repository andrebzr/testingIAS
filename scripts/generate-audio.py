"""Original deterministic cinematic score. Standard library only; 48 kHz stereo PCM."""
import math, random, wave, struct, os
RATE=48000
DURATION=15
rng=random.Random(210218)
left=[0.0]*(RATE*DURATION)
right=[0.0]*(RATE*DURATION)
def add(start, duration, signal, pan=0):
    base=round(start*RATE)
    for i in range(round(duration*RATE)):
        j=base+i
        if j>=len(left): break
        sample=signal(i/RATE,i)
        left[j]+=sample*(1-pan*.3)
        right[j]+=sample*(1+pan*.3)
# Pitched decays, original synthesis, no borrowed samples.
for start,power in [(0.2,.5),(1,.65),(2,1),(4,1),(7,1.1),(10,.9),(11.1,.5),(12.5,1.1)]:
    add(start,1.5,lambda t,i,power=power: power*(.58*math.sin(2*math.pi*(43*t+3*(1-math.exp(-t*18))))*math.exp(-t*3.8)+.17*(rng.random()*2-1)*math.exp(-t*40))*min(1,t*300))
for start in [1.5,3.45,6.45,9.55,12.0]:
    duration=.48
    add(start,duration,lambda t,i: (rng.random()*2-1)*.12*math.sin(math.pi*t/.48)**2+.035*math.sin(2*math.pi*(170*t+650*t*t))*math.sin(math.pi*t/.48)**2,pan=.45 if start<7 else -.45)
for start in [4.65,5.3,5.95,7.75,8.5,9.25,10.5,11.5,13.25,14.0]:
    add(start,.2,lambda t,i: .045*(math.sin(2*math.pi*173*t)+math.sin(2*math.pi*346*t))*math.exp(-t*28)*min(1,t*600),pan=.2)
add(2,12.7,lambda t,i: .028*(math.sin(2*math.pi*86*t)+.5*math.sin(2*math.pi*129*t))*min(1,t*2)*min(1,(12.7-t)*2))
# Tamed peak, short fade and mild stereo field.
peak=max(max(map(abs,left)),max(map(abs,right)))
scale=.86/peak
os.makedirs('public/audio',exist_ok=True)
with wave.open('public/audio/industrial.wav','wb') as out:
    out.setparams((2,2,RATE,0,'NONE','not compressed'))
    samples=bytearray()
    for i,(l,r) in enumerate(zip(left,right)):
        fade=min(1,i/(RATE*.018),(len(left)-1-i)/(RATE*.3))
        samples.extend(struct.pack('<hh',round(l*scale*fade*32767),round(r*scale*fade*32767)))
    out.writeframes(samples)
print('Original procedural score: 15 s, 48 kHz stereo, peak < -1 dBFS')
