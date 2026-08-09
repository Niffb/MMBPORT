import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import VideoPlayer from '../components/VideoPlayer';
import LightboxModal from '../components/LightboxModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FOLDERS = [
  {
    id: 'dissertation',
    folderName: 'Dissertation',
    index: '01',
    title: 'In Front, Behind, Inside',
    year: '2025',
    medium: 'Film & Dissertation',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    media: [
      { type: 'video', src: '/projects/dissertation/film.mp4', label: 'In Front, Behind, Inside — Film' },
      { type: 'pdf', src: '/projects/dissertation/dissertation.pdf', label: 'Women Making Image (PDF)' },
    ],
  },
  {
    id: 'thought-and-action',
    folderName: 'Thought and Action',
    index: '02',
    title: 'Thought and Action',
    year: '2024',
    medium: 'Film, Photography & Performance',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    media: [
      { type: 'video', src: '/projects/thought-and-action/tate-lee-miller.mp4', label: 'CineMia for Tate Lee Miller' },
      { type: 'image', src: '/projects/thought-and-action/DSC_0189.jpg', label: 'Thought and Action I' },
      { type: 'image', src: '/projects/thought-and-action/DSC_0203.jpg', label: 'Thought and Action II' },
      { type: 'image', src: '/projects/thought-and-action/IMG_5629.jpeg', label: 'Thought and Action III' },
      { type: 'image', src: '/projects/thought-and-action/IMG_5631.jpeg', label: 'Thought and Action IV' },
      { type: 'video', src: '/projects/thought-and-action/camera-lens.mp4', label: 'Video Camera Lens' },
    ],
  },
  {
    id: 'spinning-celluloid',
    folderName: 'Spinning Celluloid',
    index: '03',
    title: 'Spinning Celluloid',
    year: '2024',
    medium: 'Film',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    media: [
      { type: 'video', src: '/projects/spinning-celluloid/spinning.mp4', label: 'Spinning Celluloid' },
    ],
  },
  {
    id: 'the-pictures',
    folderName: 'The Pictures',
    index: '04',
    title: 'The Pictures',
    year: '2024',
    medium: 'Photography & Video',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
    media: [
      { type: 'image', src: '/projects/the-pictures/IMG_0010.JPG', label: 'The Pictures I' },
      { type: 'image', src: '/projects/the-pictures/IMG_0664.JPG', label: 'The Pictures II' },
      { type: 'image', src: '/projects/the-pictures/IMG_0669.JPG', label: 'The Pictures III' },
      { type: 'image', src: '/projects/the-pictures/IMG_0670.JPG', label: 'The Pictures IV' },
      { type: 'image', src: '/projects/the-pictures/IMG_0675.JPG', label: 'The Pictures V' },
      { type: 'video', src: '/projects/the-pictures/IMG_0696.MOV', label: 'The Pictures — Short Film' },
    ],
  },
  {
    id: 'situations',
    folderName: 'Situations',
    index: '05',
    title: 'Situations',
    year: '2023',
    medium: 'Photography',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia.',
    media: [
      { type: 'image', src: '/projects/situations/IMG_2661.JPG', label: 'Situations I' },
      { type: 'image', src: '/projects/situations/IMG_2679.JPG', label: 'Situations II' },
      { type: 'image', src: '/projects/situations/IMG_2700.JPG', label: 'Situations III' },
    ],
  },
];

function FolderSection({ folder, onSelectImage }) {
  const [ref, isVisible] = useScrollReveal();

  const videos = folder.media.filter((m) => m.type === 'video');
  const images = folder.media.filter((m) => m.type === 'image');
  const pdfs = folder.media.filter((m) => m.type === 'pdf');

  return (
    <section
      id={folder.id}
      ref={ref}
      className={`folder-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="folder-section__header-wrapper">
        <SectionHeader index={folder.index} title={folder.folderName} />
      </div>

      <div className="folder-section__inner">
        {/* Header Metadata - Centered */}
        <div className="folder-section__header">
          <div className="folder-section__tag">
            <span className="folder-section__icon">📁</span>
            <span className="folder-section__path">/Downloads/{folder.folderName}</span>
          </div>

          <h2 className="folder-section__title">{folder.title}</h2>

          <div className="folder-section__meta">
            <span className="folder-section__meta-item">{folder.medium}</span>
            <span className="folder-section__meta-dot">•</span>
            <span className="folder-section__meta-item">{folder.year}</span>
          </div>

          <p className="folder-section__desc">{folder.description}</p>
        </div>

        {/* Media Layout */}
        <div className="folder-section__media-container">
          {/* Video Items */}
          {videos.length > 0 && (
            <div className="folder-section__video-group">
              <h3 className="folder-section__subheading">
                Video Works <span className="folder-section__subheading-badge">{videos.length}</span>
              </h3>
              <div className={`folder-section__video-grid ${videos.length === 1 ? 'single' : 'multi'}`}>
                {videos.map((vid, idx) => (
                  <div key={idx} className="folder-section__video-item">
                    <VideoPlayer src={vid.src} autoPlayOnScroll={true} />
                    <span className="folder-section__media-caption">{vid.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Image Items */}
          {images.length > 0 && (
            <div className="folder-section__image-group">
              <h3 className="folder-section__subheading">
                Photography & Stills <span className="folder-section__subheading-badge">{images.length}</span>
              </h3>
              <div className="folder-section__image-grid">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="folder-section__image-card"
                    onClick={() => onSelectImage(folder.media, folder.media.indexOf(img))}
                  >
                    <div className="folder-section__image-wrapper">
                      <img src={img.src} alt={img.label} loading="lazy" />
                      <div className="folder-section__image-hover">
                        <span>Zoom Image ↗</span>
                      </div>
                    </div>
                    <span className="folder-section__media-caption">{img.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF Documents */}
          {pdfs.length > 0 && (
            <div className="folder-section__pdf-group">
              <h3 className="folder-section__subheading">Written Work & PDF</h3>
              {pdfs.map((pdf, idx) => (
                <div key={idx} className="folder-section__pdf-card">
                  <div className="folder-section__pdf-info">
                    <span className="folder-section__pdf-icon">📄</span>
                    <div>
                      <h4 className="folder-section__pdf-title">{pdf.label}</h4>
                      <p className="folder-section__pdf-sub">Dissertation Research & Theory</p>
                    </div>
                  </div>
                  <div className="folder-section__pdf-actions">
                    <a
                      href={pdf.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="folder-section__pdf-btn folder-section__pdf-btn--primary"
                    >
                      Read PDF ↗
                    </a>
                    <a
                      href={pdf.src}
                      download
                      className="folder-section__pdf-btn"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  const [activeMediaList, setActiveMediaList] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpenLightbox = (mediaList, index) => {
    setActiveMediaList(mediaList);
    setActiveImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setActiveMediaList(null);
  };

  const handlePrevImage = () => {
    if (!activeMediaList) return;
    let prev = activeImageIndex - 1;
    while (prev >= 0 && activeMediaList[prev].type !== 'image') {
      prev--;
    }
    if (prev >= 0) setActiveImageIndex(prev);
  };

  const handleNextImage = () => {
    if (!activeMediaList) return;
    let next = activeImageIndex + 1;
    while (next < activeMediaList.length && activeMediaList[next].type !== 'image') {
      next++;
    }
    if (next < activeMediaList.length) setActiveImageIndex(next);
  };

  const scrollToFolder = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="page-work">
      {/* Innovative Work Hero */}
      <div className="work-hero">
        <div className="work-hero__top">
          <h1 className="work-hero__title anim-reveal">Selected Works</h1>
        </div>
        <div className="work-hero__grid">
          <div className="work-hero__sidebar">
            <h2 className="work-hero__subtitle anim-reveal anim-delay-1">Archive Overview</h2>
            <p className="work-hero__desc anim-reveal anim-delay-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>

            <div className="work-hero__nav anim-reveal anim-delay-2">
              <span className="work-hero__nav-label">Explore Archive</span>
              <ul className="work-hero__nav-list">
                {FOLDERS.map((f) => (
                  <li key={f.id} className="work-hero__nav-item">
                    <button onClick={() => scrollToFolder(f.id)} className="work-hero__nav-btn">
                      <span className="work-hero__nav-index">{f.index}</span>
                      <span className="work-hero__nav-name">{f.folderName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="work-hero__main anim-reveal anim-delay-3">
            <div className="work-hero__img-frame">
              <img src="/hero-bg.jpg" alt="Mia Maya Fine Art" className="work-hero__img" />
            </div>
          </div>
        </div>
      </div>

      {/* Render Each Folder's Dedicated Section */}
      <div className="folders-list">
        {FOLDERS.map((folder) => (
          <FolderSection
            key={folder.id}
            folder={folder}
            onSelectImage={handleOpenLightbox}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMediaList && activeMediaList[activeImageIndex] && (
        <LightboxModal
          item={activeMediaList[activeImageIndex]}
          onClose={handleCloseLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          hasPrev={activeMediaList.slice(0, activeImageIndex).some((m) => m.type === 'image')}
          hasNext={activeMediaList.slice(activeImageIndex + 1).some((m) => m.type === 'image')}
        />
      )}
    </main>
  );
}
