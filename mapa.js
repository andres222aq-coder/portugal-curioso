const atlasPoints = {
  portugal: {
    tag: 'PORTUGAL · EUROPA',
    title: 'Portugal continental',
    copy: 'Portugal ocupa el oeste de la península ibérica. Selecciona un archipiélago para conocer su relación con los acuerdos atlánticos y las disputas históricas.',
    extra: 'Los marcadores de las islas se muestran ampliados en el recuadro esquemático.',
    sources: [{ label: 'RTP Ensina: rivalidad y Tratado de Alcáçovas', url: 'https://ensina.rtp.pt/explicador/conflitos-entre-portugal-e-espanha-durante-a-expansao-h44/' }]
  },
  azores: {
    tag: 'PORTUGAL · REGIÓN AUTÓNOMA',
    title: 'Azores',
    copy: 'En el siglo XV, Portugal y Castilla competían por las islas y las rutas del Atlántico. El Tratado de Alcáçovas (1479) reconoció a Portugal el dominio de las Azores.',
    extra: 'Su inclusión en el acuerdo resolvió la rivalidad de la época. Las Azores forman parte de Portugal.',
    sources: [{ label: 'RTP Ensina: el acuerdo de 1479', url: 'https://ensina.rtp.pt/explicador/conflitos-entre-portugal-e-espanha-durante-a-expansao-h44/' }]
  },
  madeira: {
    tag: 'PORTUGAL · REGIÓN AUTÓNOMA',
    title: 'Madeira',
    copy: 'La rivalidad por las islas y rutas oceánicas quedó repartida en 1479: Castilla recibió las Canarias y Portugal obtuvo el reconocimiento de Madeira y otras islas atlánticas.',
    extra: 'Madeira no es hoy un territorio en disputa: pertenece a Portugal.',
    sources: [{ label: 'RTP Ensina: el Tratado de Alcáçovas', url: 'https://ensina.rtp.pt/explicador/conflitos-entre-portugal-e-espanha-durante-a-expansao-h44/' }]
  },
  canarias: {
    tag: 'ESPAÑA · ISLAS CANARIAS',
    title: 'Canarias',
    copy: 'Este fue el archipiélago que disputaron Portugal y Castilla durante la expansión atlántica. El Tratado de Alcáçovas (1479) reconoció las Canarias a Castilla.',
    extra: 'El acuerdo terminó aquella disputa histórica. Canarias pertenece a España actualmente.',
    sources: [{ label: 'RTP Ensina: rivalidad y Tratado de Alcáçovas', url: 'https://ensina.rtp.pt/explicador/conflitos-entre-portugal-e-espanha-durante-a-expansao-h44/' }]
  },
  selvagens: {
    tag: 'PORTUGAL · DISCUSIÓN MARÍTIMA',
    title: 'Islas Salvajes · Selvagens',
    copy: 'Portugal administra este pequeño archipiélago entre Madeira y Canarias. España acepta que genera mar territorial, pero ha objetado ante la ONU que genere una zona económica exclusiva de 200 millas.',
    extra: 'La diferencia afecta los límites marítimos y los derechos sobre pesca y recursos. El debate es sobre las aguas que producen las islas, no una disputa actual por quién posee el terreno.',
    sources: [
      { label: 'Nota diplomática de España ante la ONU', url: 'https://www.un.org/depts/los/clcs_new/submissions_files/prt44_09/esp_re_prt2013e.pdf' },
      { label: 'Estudio sobre las islas y su jurisdicción marítima', url: 'https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2019.00759/full' }
    ]
  }
};

const atlasButtons = document.querySelectorAll('[data-atlas-point]');
const atlasTag = document.querySelector('#atlas-detail-tag');
const atlasTitle = document.querySelector('#atlas-detail-title');
const atlasCopy = document.querySelector('#atlas-detail-copy');
const atlasExtra = document.querySelector('#atlas-detail-extra');
const atlasSources = document.querySelector('#atlas-detail-sources');

function selectAtlasPoint(id) {
  const point = atlasPoints[id];
  if (!point) return;
  atlasTag.textContent = point.tag;
  atlasTitle.textContent = point.title;
  atlasCopy.textContent = point.copy;
  atlasExtra.textContent = point.extra;
  atlasSources.replaceChildren(...point.sources.map(source => {
    const link = document.createElement('a');
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `${source.label} ↗`;
    return link;
  }));
  atlasButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.atlasPoint === id)));
}

atlasButtons.forEach(button => button.addEventListener('click', () => selectAtlasPoint(button.dataset.atlasPoint)));
