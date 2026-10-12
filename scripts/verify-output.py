import json, subprocess, os, struct
path='output/vr-audio-reel.mp4'
data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',path]))
v=next(s for s in data['streams'] if s['codec_type']=='video')
a=next(s for s in data['streams'] if s['codec_type']=='audio')
assert (v['codec_name'],v['width'],v['height'],v['r_frame_rate'],v['pix_fmt'])==('h264',1080,1920,'30/1','yuv420p'),v
assert int(v['nb_frames'])==450,v
assert v['color_space']=='bt709' and v['color_range']=='tv',v
assert a['codec_name']=='aac' and int(a['sample_rate'])==48000,a
assert abs(float(data['format']['duration'])-15)<.1,data['format']
atoms=[]
with open(path,'rb') as mp4:
    total=os.path.getsize(path)
    while mp4.tell()<total:
        start=mp4.tell()
        header=mp4.read(8)
        if len(header)<8: break
        size,kind=struct.unpack('>I4s',header)
        if size==1:size=struct.unpack('>Q',mp4.read(8))[0]
        if size==0:size=total-start
        assert size>=8,'Invalid MP4 atom'
        atoms.append(kind.decode('ascii'))
        mp4.seek(start+size)
assert atoms.index('moov')<atoms.index('mdat'),'MP4 faststart missing'
subprocess.run(['ffmpeg','-v','error','-i',path,'-f','null','-'],check=True)
with open('output/verification.json','w') as report:
    json.dump({'file':path,'bytes':os.path.getsize(path),'duration':15,'frames':450,'fps':30,'width':1080,'height':1920,'video':'h264','pixel_format':v['pix_fmt'],'color_space':v['color_space'],'range':v['color_range'],'audio':'aac','sample_rate':48000,'faststart':True,'full_decode':'passed'},report,indent=2)
print(f'Verified: {os.path.abspath(path)} | 1080×1920 | 450 frames | 30 FPS | 15 s | H.264 + AAC | {os.path.getsize(path)/1e6:.2f} MB | full decode OK')
