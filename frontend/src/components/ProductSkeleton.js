import { Col } from 'react-bootstrap';

/**
 * Animated skeleton placeholder that shows while products are loading.
 * Uses the shimmer CSS animation already defined in index.css.
 */
const ProductSkeleton = () => (
  <Col sm={12} md={6} lg={4} xl={3} className="mb-4">
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-text" style={{ width: '85%' }} />
      <div className="skeleton-text short" />
      <div className="skeleton-text" style={{ width: '40%', height: '20px' }} />
      <div className="d-flex gap-2 mt-2">
        <div className="skeleton-text" style={{ width: '40px', height: '32px', borderRadius: '8px' }} />
        <div className="skeleton-text" style={{ flex: 1, height: '32px', borderRadius: '8px' }} />
      </div>
    </div>
  </Col>
);

/**
 * Renders a row of skeleton cards for a section.
 * @param {number} count — number of skeleton cards to show
 */
export const SkeletonRow = ({ count = 4 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </>
);

/**
 * Horizontal skeleton strip (for the scrollable sections like Hot Picks)
 */
export const SkeletonStrip = ({ count = 5 }) => (
  <div className="d-flex overflow-hidden pb-4 mb-5" style={{ gap: '20px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ width: '280px', flex: '0 0 auto' }}>
        <div className="skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-text" style={{ width: '85%' }} />
          <div className="skeleton-text short" />
          <div className="skeleton-text" style={{ width: '40%', height: '20px' }} />
        </div>
      </div>
    ))}
  </div>
);

export default ProductSkeleton;
