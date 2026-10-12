# VR Áudio — Som que move você

Campanha vertical de motion design em React, TypeScript e Remotion. **15 segundos · 1080 × 1920 · 30 FPS · H.264 / AAC**. Seis cenas com revelação de produto, waveforms, pulsos de grave, máscaras, câmera digital, light sweep, grid técnico e grain discreto. Trilha sintetizada do zero, sem samples de terceiros.

## Instalar no Windows

Baixe o ZIP da branch `main` pelo GitHub, com sua conta conectada: https://github.com/andrebzr/testingIAS/archive/refs/heads/main.zip.

Extraia o ZIP inteiro para uma pasta sua (por exemplo, `Documentos\VR-Audio`). Dentro da pasta extraída, dê dois cliques em **`INSTALAR-WINDOWS.cmd`**. O instalador usa o WinGet para instalar os requisitos ausentes (Node LTS, Python 3 e FFmpeg), instala as dependências pelo lockfile, gera fontes e áudio, valida TypeScript, abre o vídeo e inicia o Studio no navegador. Chrome ou Edge existentes são detectados automaticamente; sem navegador compatível, Remotion baixa seu navegador suportado quando necessário para renderização.

O vídeo já renderizado está em **`delivery\vr-audio-reel.mp4`** e pode ser aberto sem instalar dependências. Seu SHA-256 consta em `delivery/manifest.json`; o instalador confere o checksum antes de abri-lo. Se um vídeo diferente já existir em `output`, ele é preservado.

O launcher usa uma política de execução do PowerShell apenas no seu próprio processo; não altera a política permanente do Windows. Não é necessário informar senhas ou tokens ao instalador. Se WinGet estiver ausente, instale/atualize o **App Installer**, da Microsoft, na Microsoft Store.

**Limite de validação:** dependências, scripts portáveis e render foram validados na máquina Linux na nuvem. A instalação completa em uma máquina Windows física não foi executada aqui; o instalador mostra e interrompe erros em vez de declarar sucesso sem verificar os comandos.

## Executar

Requisitos: Node.js 22 ou 24, npm, Python 3, FFmpeg/ffprobe e Chromium. Nesta máquina o Chromium está em `/usr/bin/chromium`; em outra instalação, defina `CHROME_PATH` para o executável do navegador. Sem navegador local, os scripts de renderização permitem o download padrão do Remotion. A auditoria usa Chromium local.

```bash
cd /workspace/testingIAS
npm ci --ignore-scripts
npm run assets
npm run audio
npm run typecheck
npm start
```

O Studio abre a composição `VRAudioReel`. As fontes são locais: nenhuma requisição externa é necessária durante o render. As imagens em `public/products` também são locais.

```bash
npm run audit:safe
npm run stills
npm run render
npm run verify
```

Saída: **`output/vr-audio-reel.mp4`**. O render prepara fontes e áudio automaticamente, usa dois workers, frames intermediários PNG, CRF 18, yuv420p, BT.709 em faixa limitada e AAC 192 kbps, e aplica `faststart` sem recodificar. `verify` verifica codecs, dimensões, FPS, 450 frames, duração, espaço de cor, faststart e decodificação integral; salva `output/verification.json`. Os outputs ficam fora do Git para evitar versionar renders pesados.

## Timeline

| Tempo     | Cena             | Conteúdo                                     |
| --------- | ---------------- | -------------------------------------------- |
| 0–2 s     | Intro            | Sinal, precisão e potência                   |
| 2–4 s     | BrandReveal      | Logo oficial e SOM QUE MOVE VOCÊ             |
| 4–7 s     | VR210Scene       | VR210 FULL, especificações e linhas técnicas |
| 7–10 s    | SW218Scene       | Subwoofer e onda de baixa frequência         |
| 10–12,5 s | EngineeringScene | Fabricação nacional e Eighteen Sound         |
| 12,5–15 s | Outro            | Headline, site, Instagram e CTA              |

Os impactos da trilha coincidem com os cortes em 2, 4, 7, 10 e 12,5 s. A duração de cada cena é definida em `src/compositions/VRAudioReel.tsx`; os impactos estão em `scripts/generate-audio.py`. Para sincronizar música no Instagram, silencie o áudio do arquivo ao editar ou exporte uma cópia com `ffmpeg -i output/vr-audio-reel.mp4 -c:v copy -an output/vr-audio-reel-silent.mp4`.

## Imagens e referências

Logo e fotos foram obtidos da página oficial **https://vraudio.com.br**. A imagem oficial de VR210 mostra um sistema montado; não foi apresentada como uma foto isolada de um gabinete. O fundo preto das fotos é integrado usando máscara CSS; a proporção é preservada. A foto anexada ao chat foi referência visual, não um arquivo incorporado ao projeto.

Arquivos substituíveis em `public/products/`:

- `vr210.png`
- `sw218.png`
- `vt46.png`
- `vt44.png`
- `logo.png`

O roteiro usa VR210 e SW218. VT4.6 e VT4.4 ficam disponíveis para futuras composições. Execute `npm run assets` após trocar ou remover imagens. Sem fotos, o render continua com estudos vetoriais de gabinetes, não réplicas técnicas certificadas. Sem logo, entra a assinatura tipográfica VR AUDIO. Os scripts leem o inventário de arquivos a cada render; o Studio detecta os arquivos públicos.

Especificações e afirmações de marca foram conferidas no site oficial e no briefing: 133 dB SPL, 2 × 10″ LF, 120° H e 70 Hz–18 kHz para VR210; 2 × 18″, 28–120 Hz e 130 dB SPL para SW218. O site identifica os valores SPL como contínuos. Coordenadas e desenhos gráficos da cena de engenharia são elementos de direção de arte.

## Área segura e revisão

Textos importantes ficam em x=80–1000 e y=220–1600. `audit:safe` mede os textos visíveis no DOM em **todos os 450 frames**, incluindo fontes, transforms e clipping, e falha se houver invasão de margem. Relatório: `output/review/safe-area.json`.

`stills` produz uma imagem representativa de cada cena em `output/review`. A validação automática de margens complementa a revisão visual; não substitui conferir estética e legibilidade em um celular. A interface do Instagram pode variar.

## Estrutura

`src/scenes` contém as seis cenas; `src/components` contém os elementos visuais; `src/theme` e `src/utils` concentram tokens e easing. `scripts` cuida de assets, áudio, render e validação. As animações dependem exclusivamente do frame, sem relógio de parede ou aleatoriedade visual não determinística.

## Direitos

Fotos e logo pertencem à VR Áudio; incluídos para esta campanha solicitada. A disponibilidade pública não concede licença geral para outros usos. Archivo é distribuída sob SIL Open Font License; veja `public/fonts/OFL.txt`. A trilha é gerada pelas fórmulas originais neste projeto.

## Ambiente na nuvem

Use o checkout existente em `/workspace/testingIAS`: cada tarefa já é isolada, sem necessidade de criar worktrees. A instalação pode ser repetida com `npm ci`, `npm run assets` e `npm run audio`. O Studio é um processo e precisa ser iniciado novamente em uma nova tarefa. Dependências e arquivos retidos no snapshot não significam que serviços estão ativos. Os scripts e instruções de inicialização também são salvos no rascunho das configurações do ambiente; publicação é feita pela interface do produto.
