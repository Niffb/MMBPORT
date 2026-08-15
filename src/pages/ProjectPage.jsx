import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import LightboxModal from '../components/LightboxModal';
import HorizontalCarousel from '../components/HorizontalCarousel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getAssetUrl } from '../utils/asset';

const PROJECT_ORDER = [
  'upskirt',
  'fraud-awards',
  'in-front-behind-inside',
  'cinemeia',
  'spinning-celluloid',
  'the-pictures'
];

const PROJECTS = {
  upskirt: {
    title: 'UpSkirt',
    year: '2026',
    medium: 'Live performance, film projection, installation',
    heroImage: '/projects/upskirt/Screenshot 2026-08-09 at 16.00.22.jpeg',
    accentColor: true,
    blocks: [
      {
        type: 'upskirt-triptych',
        leftVideo: '/projects/upskirt/left.mp4',
        centerImg: '/projects/upskirt/knockout 20.PNG',
        rightVideo: '/projects/upskirt/right.mp4',
        scrollHint: 'Scroll down'
      },
      {
        type: 'full-video',
        src: '/projects/upskirt/UPSKIRT PERFORMANCE.mp4',
        scrollHint: 'Scroll down'
      },
      {
        type: 'text-statement',
        title: 'Project Statement',
        content: [
          'UpSkirt explores bodily agency, female spectacle, and the tension between public installation and private vulnerability.',
          'Suspended within the architectural volume of the gallery space, the monumental skirt structure functions simultaneously as an architectural enclosure, a projection screen, and a sculptural boundary. Beneath the canopy, live performance and multi-channel synchronized video loops create an immersive voyeuristic encounter that directly questions gaze, autonomy, and the staging of the female form.'
        ]
      }
    ]
  },
  'fraud-awards': {
    title: 'Fraud Awards',
    year: '2024',
    medium: 'Film',
    heroImage: '/projects/fraud-awards/Screenshot 2026-08-09 at 16.13.23.jpg',
    blocks: [
      {
        type: 'full-video',
        src: '/projects/fraud-awards/Fraud Awards All Films Loop - Mia Maya Bevan copy.mov',
        scrollHint: 'Scroll down'
      },
      {
        type: 'fraud-awards-gallery',
        images: [
          '/projects/fraud-awards/photo-1.png',
          '/projects/fraud-awards/photo-2.png',
          '/projects/fraud-awards/photo-3.png',
          '/projects/fraud-awards/photo-4.png',
          '/projects/fraud-awards/photo-5.png',
          '/projects/fraud-awards/photo-6.png'
        ],
        text: [
          'Fraud Awards interrogates institutional validation, imposter phenomenon, and the superficial ceremonies of achievement in contemporary creative cultures.',
          'Through tactile trophy sculptures and satirical film sequences, the project deconstructs the rituals of recognition, examining how value and legitimacy are awarded, received, and contested.'
        ],
        scrollHint: 'Scroll down'
      },
      {
        type: 'exhibition-rows',
        title: 'In Exhibition',
        rows: [
          {
            image: '/projects/fraud-awards/exhibition-adema.png',
            title: 'Art Biennial for Art Week 2025',
            venue: 'ADEMA University School, Mallorca',
            dates: 'Exhibited from June – September 2025',
            honor: 'Achieved runner up for Barceló Group Emerging Artist Award'
          },
          {
            videoSrc: '/projects/fraud-awards/Fraud Awards in the Crypt - Mia Maya Bevan.mov',
            title: 'Inhabiting the Inbetween Exhibition',
            venue: 'The Crypt Gallery, Euston',
            dates: 'Exhibited from 20th – 22nd April 2024',
            honor: 'Self-organised group exhibition'
          }
        ]
      }
    ]
  },
  'in-front-behind-inside': {
    title: 'In Front, Behind, Inside',
    year: '2026',
    medium: 'Film',
    heroImage: '/projects/dissertation/88923F64-C0F6-4C7F-A6F6-1C0A9B5B44A3.jpg',
    blocks: [
      {
        type: 'full-video',
        src: '/projects/dissertation/IN FRONT, BEHIND, INSIDE FINAL FILM.mp4',
        scrollHint: 'Scroll down'
      },
      {
        type: 'text-statement-with-pdf',
        title: 'Film & Critical Theory',
        content: [
          'In Front, Behind, Inside investigates somatic perception, optical illusion, and the apparatus of cinema as a physical extension of the body.',
          'The film documents wearable zoetrope apparatuses and cylindrical projection devices interacting with human movement, blurring the line between viewer, lens, and subject.'
        ],
        pdf: {
          title: 'Women Making Image: In Front, Behind, and Inside',
          fileUrl: '/projects/dissertation/Women Making Image_ In Front, Behind, and Inside - Mia Maya Bevan (4).pdf'
        }
      }
    ]
  },
  cinemeia: {
    title: 'CineMia',
    year: '2025',
    medium: 'Live Performance, film projection',
    heroImage: '/projects/thought-and-action/DSC_0189.jpg',
    blocks: [
      {
        type: 'cinemeia-duo',
        images: [
          '/projects/thought-and-action/IMG_5631.jpeg',
          '/projects/thought-and-action/IMG_5629.jpeg'
        ],
        videoSrc: '/projects/thought-and-action/CineMia for Tate Lee Miller.mp4',
        scrollHint: 'Scroll down'
      },
      {
        type: 'two-col-image-text',
        imageSrc: '/projects/thought-and-action/projection-shirt.jpg',
        text: [
          'CineMia transforms the artist’s living body into an active projection surface, merging moving-image projection with intimate live action.',
          'Presented in collaboration with Tate Lee Miller, the piece interrogates screen cultures, cinematic duration, and how projected moving images interact directly with breathing fabric and human posture.'
        ]
      }
    ]
  },
  'spinning-celluloid': {
    title: 'Spinning Celluloid',
    year: '2025',
    medium: 'Live Performance, costume, sculpture',
    heroImage: '/projects/spinning-celluloid/IMG_2415.jpg',
    blocks: [
      {
        type: 'two-col-text-video',
        text: [
          'Spinning Celluloid fuses kinetic sculpture, custom luminous costume, and early cinematic motion mechanisms.',
          'Using rotating light beams, suspended apparatuses, and translucent materials, the performance generates a mesmerizing stroboscopic atmosphere that evokes early 20th-century optical experimentation.'
        ],
        videoSrc: '/projects/spinning-celluloid/Spinning for Portfolio.mp4'
      }
    ]
  },
  'the-pictures': {
    title: 'Untitled',
    year: '2025',
    medium: 'Sculpture',
    heroImage: '/projects/the-pictures/IMG_0670.JPG',
    blocks: [
      {
        type: 'image-triptych',
        images: [
          { src: '/projects/the-pictures/IMG_0010.JPG' },
          { src: '/projects/the-pictures/IMG_0664.JPG' },
          { src: '/projects/the-pictures/IMG_0669.JPG' }
        ],
        scrollHint: 'Scroll down'
      },
      {
        type: 'text-statement',
        title: 'Sculptural Investigation',
        content: [
          'Constructed from repurposed industrial domestic appliances, this kinetic sculpture transforms a washing machine chassis into an illuminated zoetrope drum.',
          'Through rhythmic mechanical rotation and custom celluloid animation strips, domestic hardware is recontextualized into a hypnotic apparatus for moving image projection.'
        ]
      },
      {
        type: 'full-image',
        src: '/projects/the-pictures/IMG_0675.JPG',
        alt: 'Window installation sequence'
      },
      {
        type: 'full-video',
        src: '/projects/the-pictures/IMG_0696.MOV'
      }
    ]
  }
};

function BlockRenderer({ block, onImageClick }) {
  const [ref, isVisible] = useScrollReveal();
  const visibleClass = isVisible ? ' is-visible' : '';

  switch (block.type) {
    case 'upskirt-triptych':
      return (
        <section ref={ref} className={`project-block project-block--upskirt-triptych anim-reveal ${visibleClass}`}>
          <div className="upskirt-triptych-grid">
            <div className="triptych-col video-side left">
              <div className="triptych-media-wrapper">
                <VideoPlayer src={getAssetUrl(block.leftVideo)} autoPlayOnScroll={true} />
              </div>
            </div>

            <div className="triptych-col center-cutout">
              <div
                className="triptych-cutout-wrapper"
                onClick={() => onImageClick(block.centerImg)}
              >
                <img
                  src={getAssetUrl(block.centerImg)}
                  alt="UpSkirt Legs Cutout"
                  className="cutout-img"
                />
              </div>
            </div>

            <div className="triptych-col video-side right">
              <div className="triptych-media-wrapper">
                <VideoPlayer src={getAssetUrl(block.rightVideo)} autoPlayOnScroll={true} />
              </div>
            </div>
          </div>

          {block.scrollHint && (
            <div className="project-scroll-down-hint">
              <span>{block.scrollHint}</span>
              <span className="scroll-arrow-anim">↓</span>
            </div>
          )}
        </section>
      );

    case 'full-video':
      return (
        <section ref={ref} className={`project-block project-block--full-video anim-reveal ${visibleClass}`}>
          <div className="project-full-video-card">
            <VideoPlayer src={getAssetUrl(block.src)} autoPlayOnScroll={true} />
          </div>
          {block.scrollHint && (
            <div className="project-scroll-down-hint">
              <span>{block.scrollHint}</span>
              <span className="scroll-arrow-anim">↓</span>
            </div>
          )}
        </section>
      );

    case 'text-statement':
      return (
        <section ref={ref} className={`project-block project-block--statement anim-reveal ${visibleClass}`}>
          <div className="editorial-statement-box">
            <div className="statement-header-badge">
              <span className="statement-num">01</span>
              <span className="statement-dot">•</span>
              <span className="statement-category">Project Statement</span>
            </div>
            {block.title && <h3 className="editorial-statement-title">{block.title}</h3>}
            <div className="editorial-statement-body">
              {block.content.map((paragraph, i) => (
                <p key={i} className={`editorial-statement-p ${i === 0 ? 'editorial-statement-p--lead' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      );

    case 'text-statement-with-pdf':
      return (
        <section ref={ref} className={`project-block project-block--statement anim-reveal ${visibleClass}`}>
          <div className="editorial-statement-box">
            <div className="statement-header-badge">
              <span className="statement-num">01</span>
              <span className="statement-dot">•</span>
              <span className="statement-category">Film & Critical Theory</span>
            </div>
            {block.title && <h3 className="editorial-statement-title">{block.title}</h3>}
            <div className="editorial-statement-body">
              {block.content.map((paragraph, i) => (
                <p key={i} className={`editorial-statement-p ${i === 0 ? 'editorial-statement-p--lead' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {block.pdf && (
              <div className="dissertation-pdf-box">
                <div className="pdf-box-header">
                  <span className="pdf-box-icon">📄</span>
                  <div>
                    <h4 className="pdf-box-title">Dissertation Essay</h4>
                    <span className="pdf-box-subtitle">{block.pdf.title}</span>
                  </div>
                </div>
                <a
                  href={getAssetUrl(block.pdf.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dissertation-open-btn"
                >
                  <span>Read Dissertation Essay (PDF)</span>
                  <span className="btn-arrow">↗</span>
                </a>
              </div>
            )}
          </div>
        </section>
      );

    case 'fraud-awards-gallery':
      return (
        <section ref={ref} className={`project-block project-block--fraud-gallery anim-reveal ${visibleClass}`}>
          <div className="fraud-gallery-split">
            {/* Left: Horizontal Scroll Carousel */}
            <div className="fraud-gallery-left">
              <HorizontalCarousel
                images={block.images}
                onImageClick={onImageClick}
                height={480}
              />
            </div>

            {/* Right: Text statement */}
            <div className="fraud-gallery-right">
              <div className="editorial-statement-box editorial-statement-box--flush">
                <div className="statement-header-badge">
                  <span className="statement-num">02</span>
                  <span className="statement-dot">•</span>
                  <span className="statement-category">Valuation & Ceremony</span>
                </div>
                <h3 className="editorial-statement-title">Awards & Ritual</h3>
                <div className="editorial-statement-body">
                  {block.text.map((p, i) => (
                    <p key={i} className={`editorial-statement-p ${i === 0 ? 'editorial-statement-p--lead' : ''}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {block.scrollHint && (
            <div className="project-scroll-down-hint">
              <span>{block.scrollHint}</span>
              <span className="scroll-arrow-anim">↓</span>
            </div>
          )}
        </section>
      );

    case 'exhibition-rows':
      return (
        <section ref={ref} className={`project-block project-block--exhibition-rows anim-reveal ${visibleClass}`}>
          <div className="exhibition-rows-header">
            <h2 className="exhibition-rows-title">{block.title}</h2>
          </div>

          <div className="exhibition-rows-stack">
            {block.rows.map((row, i) => (
              <div key={i} className="exhibition-row">
                <div className="exhibition-row__media">
                  {row.image && (
                    <div className="exhibition-row__img-frame" onClick={() => onImageClick(row.image)}>
                      <img src={getAssetUrl(row.image)} alt={row.title} />
                    </div>
                  )}
                  {row.videoSrc && (
                    <div className="exhibition-row__video-frame">
                      <VideoPlayer src={getAssetUrl(row.videoSrc)} autoPlayOnScroll={true} />
                    </div>
                  )}
                </div>
                <div className="exhibition-row__info">
                  <h3 className="exhibition-row__name">{row.title}</h3>
                  <p className="exhibition-row__venue">{row.venue}</p>
                  <p className="exhibition-row__dates">{row.dates}</p>
                  {row.honor && <p className="exhibition-row__honor">{row.honor}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'two-col-video-text':
      return (
        <section ref={ref} className={`project-block project-block--two-col-feature anim-reveal ${visibleClass}`}>
          <div className="two-col-feature-grid">
            <div className="feature-col media-col">
              <div className="feature-video-wrapper">
                <VideoPlayer src={getAssetUrl(block.videoSrc)} autoPlayOnScroll={true} />
              </div>
            </div>

            <div className="feature-col text-col">
              <div className="editorial-statement-box editorial-statement-box--flush">
                <div className="statement-header-badge">
                  <span className="statement-num">01</span>
                  <span className="statement-dot">•</span>
                  <span className="statement-category">Film & Critical Theory</span>
                </div>
                <h3 className="editorial-statement-title">Somatic Perception</h3>
                <div className="editorial-statement-body">
                  {block.text.map((p, i) => (
                    <p key={i} className={`editorial-statement-p ${i === 0 ? 'editorial-statement-p--lead' : ''}`}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* PDF Dissertation Button */}
                {block.pdf && (
                  <div className="dissertation-pdf-box">
                    <div className="pdf-box-header">
                      <span className="pdf-box-icon">📄</span>
                      <div>
                        <h4 className="pdf-box-title">Dissertation Essay</h4>
                        <span className="pdf-box-subtitle">{block.pdf.title}</span>
                      </div>
                    </div>
                    <a
                      href={getAssetUrl(block.pdf.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dissertation-open-btn"
                    >
                      <span>Read Dissertation Essay (PDF)</span>
                      <span className="btn-arrow">↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case 'cinemeia-duo':
      return (
        <section ref={ref} className={`project-block project-block--cinemeia-duo anim-reveal ${visibleClass}`}>
          <div className="cinemeia-duo-grid">
            <div className="cinemeia-col images-col">
              {block.images.map((img, i) => (
                <div key={i} className="cinemeia-img-wrapper" onClick={() => onImageClick(img)}>
                  <img src={getAssetUrl(img)} alt={`CineMia Documentation ${i + 1}`} />
                </div>
              ))}
            </div>

            <div className="cinemeia-col video-col">
              <div className="cinemeia-video-wrapper">
                <VideoPlayer src={getAssetUrl(block.videoSrc)} autoPlayOnScroll={true} />
              </div>
            </div>
          </div>

          {block.scrollHint && (
            <div className="project-scroll-down-hint">
              <span>{block.scrollHint}</span>
              <span className="scroll-arrow-anim">↓</span>
            </div>
          )}
        </section>
      );

    case 'two-col-image-text':
      return (
        <section ref={ref} className={`project-block project-block--two-col-feature anim-reveal ${visibleClass}`}>
          <div className="two-col-feature-grid">
            <div className="feature-col media-col">
              <div className="feature-img-wrapper" onClick={() => onImageClick(block.imageSrc)}>
                <img src={getAssetUrl(block.imageSrc)} alt="Live Performance Projection" />
              </div>
            </div>

            <div className="feature-col text-col">
              <div className="editorial-statement-box editorial-statement-box--flush">
                <div className="statement-header-badge">
                  <span className="statement-num">02</span>
                  <span className="statement-dot">•</span>
                  <span className="statement-category">Bodily Screen</span>
                </div>
                <h3 className="editorial-statement-title">Living Projection</h3>
                <div className="editorial-statement-body">
                  {block.text.map((p, i) => (
                    <p key={i} className={`editorial-statement-p ${i === 0 ? 'editorial-statement-p--lead' : ''}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case 'two-col-text-video':
      return (
        <section ref={ref} className={`project-block project-block--two-col-feature anim-reveal ${visibleClass}`}>
          <div className="two-col-feature-grid reverse-on-desktop">
            <div className="feature-col text-col">
              <div className="editorial-statement-box editorial-statement-box--flush">
                <div className="statement-header-badge">
                  <span className="statement-num">01</span>
                  <span className="statement-dot">•</span>
                  <span className="statement-category">Kinetic Costume</span>
                </div>
                <h3 className="editorial-statement-title">Kinetic Performance</h3>
                <div className="editorial-statement-body">
                  {block.text.map((p, i) => (
                    <p key={i} className={`editorial-statement-p ${i === 0 ? 'editorial-statement-p--lead' : ''}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="feature-col media-col">
              <div className="feature-video-wrapper">
                <VideoPlayer src={getAssetUrl(block.videoSrc)} autoPlayOnScroll={true} />
              </div>
            </div>
          </div>
        </section>
      );

    case 'image-triptych':
      return (
        <section ref={ref} className={`project-block project-block--triptych anim-reveal ${visibleClass}`}>
          <div className="sculpture-triptych-grid">
            {block.images.map((item, i) => (
              <div key={i} className="triptych-item" onClick={() => onImageClick(item.src)}>
                <div className="triptych-img-wrapper">
                  <img src={getAssetUrl(item.src)} alt={`Sculpture View ${i + 1}`} />
                </div>
              </div>
            ))}
          </div>

          {block.scrollHint && (
            <div className="project-scroll-down-hint">
              <span>{block.scrollHint}</span>
              <span className="scroll-arrow-anim">↓</span>
            </div>
          )}
        </section>
      );

    case 'window-sequence':
      return (
        <section ref={ref} className={`project-block project-block--window anim-reveal ${visibleClass}`}>
          <div className="window-sequence-card" onClick={() => onImageClick(block.imageSrc)}>
            <img src={getAssetUrl(block.imageSrc)} alt="Window sequence installation" />
            <div className="window-sequence-overlay">
              <span>Architectural Window Installation</span>
            </div>
          </div>

          {block.videoSrc && (
            <div className="window-video-sub" style={{ marginTop: '3rem' }}>
              <VideoPlayer src={getAssetUrl(block.videoSrc)} autoPlayOnScroll={true} />
            </div>
          )}
        </section>
      );

    case 'full-image':
      return (
        <section ref={ref} className={`project-block project-block--full-image anim-reveal ${visibleClass}`}>
          <div className="project-full-image-card" onClick={() => onImageClick(block.src)}>
            <img src={getAssetUrl(block.src)} alt={block.alt || 'Artwork'} />
            <div className="project-visual-badge">
              <span className="badge-dot" />
              <span>Full View</span>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS[slug];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!project) {
    return (
      <main className="project-page">
        <div className="project-page__not-found">
          <h1>Project not found</h1>
          <Link to="/" className="btn-pill" style={{ marginTop: '2rem', display: 'inline-block' }}>
            ← Back Home
          </Link>
        </div>
      </main>
    );
  }

  const isUpskirt = slug === 'upskirt';
  const currentIndex = PROJECT_ORDER.indexOf(slug);
  const prevSlug = currentIndex > 0 ? PROJECT_ORDER[currentIndex - 1] : null;
  const nextSlug = currentIndex < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[currentIndex + 1] : null;

  const openLightbox = (imgSrc) => {
    setLightboxImage({ type: 'image', src: getAssetUrl(imgSrc) });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  return (
    <main className={`project-page${isUpskirt ? ' project-page--accent' : ''}`}>
      {/* Top Breadcrumb & Navigation */}
      <div className="project-page__top-nav">
        <Link to="/#portfolio" className="project-page__back-link">
          <span className="back-arrow">←</span>
          <span>Portfolio</span>
        </Link>
        <span className="project-page__count-badge">
          {String(currentIndex + 1).padStart(2, '0')} / {String(PROJECT_ORDER.length).padStart(2, '0')}
        </span>
      </div>

      {/* Hero Header: Side-by-Side Photo & Title (matching slides 2, 6, 10, 12, 15, 17) */}
      <section className="project-hero project-hero--gallery-split">
        <div className="project-hero__container">
          <div className="project-hero__visual-col" onClick={() => openLightbox(project.heroImage)}>
            <div className="project-hero__img-frame">
              <img
                src={getAssetUrl(project.heroImage)}
                alt={project.title}
                className="project-hero__img"
              />
              <div className="project-visual-badge">
                <span className="badge-dot" />
                <span>Full View</span>
              </div>
            </div>
          </div>

          <div className="project-hero__info-col">
            <h1 className="project-hero__title">
              {project.title}, <span className="project-hero__year">{project.year}</span>
            </h1>
            <p className="project-hero__medium">{project.medium}</p>
          </div>
        </div>
      </section>

      {/* Render Slide Blocks */}
      <div className="project-blocks">
        {project.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} onImageClick={openLightbox} />
        ))}
      </div>

      {/* Bottom Project Pagination Footer */}
      <section className="project-footer-nav">
        <div className="project-footer-nav__inner">
          {prevSlug ? (
            <Link to={`/project/${prevSlug}`} className="footer-nav-link prev">
              <span className="footer-nav-label">← Previous Project</span>
              <span className="footer-nav-title">{PROJECTS[prevSlug].title}</span>
            </Link>
          ) : (
            <div />
          )}

          <Link to="/#portfolio" className="footer-nav-grid-btn" title="View all projects">
            <span>All Projects</span>
          </Link>

          {nextSlug ? (
            <Link to={`/project/${nextSlug}`} className="footer-nav-link next">
              <span className="footer-nav-label">Next Project →</span>
              <span className="footer-nav-title">{PROJECTS[nextSlug].title}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImage && (
        <LightboxModal
          item={lightboxImage}
          onClose={closeLightbox}
          hasPrev={false}
          hasNext={false}
        />
      )}
    </main>
  );
}
