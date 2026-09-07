import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import IndexPage from './pages/index';
import ArchivePage from './pages/archive';
import PensievePage from './pages/pensieve';
import TagsPage from './pages/pensieve/tags';
import NotFoundPage from './pages/404';
import PostTemplate from './templates/post';
import TagTemplate from './templates/tag';

const withLocation = Component => {
  const WithLocation = props => <Component {...props} location={useLocation()} />;
  WithLocation.displayName = `WithLocation(${Component.displayName || Component.name})`;
  return WithLocation;
};
const Index = withLocation(IndexPage);
const Archive = withLocation(ArchivePage);
const Pensieve = withLocation(PensievePage);
const Tags = withLocation(TagsPage);
const NotFound = withLocation(NotFoundPage);

const Post = () => (
  <PostTemplate location={useLocation()} slug={`/pensieve/${useParams()['*']}`} />
);
const Tag = () => <TagTemplate location={useLocation()} tagSlug={useParams().tag} />;

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/pensieve" element={<Pensieve />} />
        <Route path="/pensieve/tags" element={<Tags />} />
        <Route path="/pensieve/tags/:tag" element={<Tag />} />
        <Route path="/pensieve/*" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
