import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getAssetUrl } from '../utils/asset';

const PROJECTS = {
  upskirt: {
    title: 'UPSKIRT',
    year: '2026',
    medium: 'Installation, live performance, film projection',
    accentColor: true,
    heroImage: '/hero-bg.jpg',
    video: '/projects/dissertation/film.mp4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  },
  'fraud-awards': {
    title: 'Fraud Awards',
    year: '2024',
    medium: 'Film',
    video: '/projects/dissertation/film.mp4',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  'in-front-behind-inside': {
    title: 'In Front, Behind, Inside',
    year: '2026',
    medium: 'Film',
    video: '/projects/dissertation/film.mp4',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  },
  cinemeia: {
    title: 'CineMia',
    year: '2026',
    medium: 'Live performance, film projection',
    video: '/projects/thought-and-action/tate-lee-miller.mp4',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  },
  'spinning-celluloid': {
    title: 'Spinning Celluloid',
    year: '2025',
    medium: 'Live performance, costume, sculpture',
    video: '/projects/spinning-celluloid/spinning.mp4',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
  },
  'the-pictures': {
    title: 'The Pictures',
    year: '2025',
    medium: 'Sculpture',
    images: [
      '/projects/the-pictures/IMG_0010.JPG',
      '/projects/the-pictures/IMG_0664.JPG',
      '/projects/the-pictures/IMG_0669.JPG',
      '/projects/the-pictures/IMG_0670.JPG',
      '/projects/the-pictures/IMG_0675.JPG',
    ],
    video: '/projects/the-pictures/IMG_0696.MOV',
    description:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.',
  },
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = PROJECTS[slug];
  const [descRef, descVisible] = useScrollReveal();

  if (!project) {
    return (
      <main className="project-page">
        <div className="project-page__not-found">
          <h1>Project not found</h1>
        </div>
      </main>
    );
  }

  const isUpskirt = slug === 'upskirt';

  return (
    <main className={`project-page${isUpskirt ? ' project-page--accent' : ''}`}>
      {/* HERO */}
      {isUpskirt ? (
        <section className="project-hero project-hero--upskirt">
          <span className="project-hero__flanked-text anim-reveal">UPSKIRT</span>
          <div className="project-hero__center-img anim-reveal anim-delay-1">
            <img src={getAssetUrl(project.heroImage)} alt={project.title} />
          </div>
          <span className="project-hero__flanked-text anim-reveal anim-delay-2">UPSKIRT</span>
        </section>
      ) : (
        <section className="project-hero project-hero--standard">
          <div className="project-hero__text anim-reveal">
            <h1 className="project-hero__title">{project.title}</h1>
            <span className="project-hero__meta">{project.year} · {project.medium}</span>
          </div>
        </section>
      )}

      {/* VIDEO */}
      {project.video && (
        <section className="project-video anim-reveal anim-delay-2">
          <VideoPlayer src={getAssetUrl(project.video)} autoPlayOnScroll={true} />
        </section>
      )}

      {/* DESCRIPTION */}
      <section
        ref={descRef}
        className={`project-desc${descVisible ? ' is-visible' : ''}`}
      >
        <p>{project.description}</p>
      </section>

      {/* IMAGE GALLERY (if applicable) */}
      {project.images && project.images.length > 0 && (
        <section className="project-gallery">
          {project.images.map((src, idx) => (
            <img key={idx} src={getAssetUrl(src)} alt={`${project.title} ${idx + 1}`} loading="lazy" />
          ))}
        </section>
      )}
    </main>
  );
}
