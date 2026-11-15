/** Marcador de carga con la forma de una tarjeta de inmueble. */
const PropertySkeleton = () => (
  <div className="col-12 col-md-6 col-xl-4">
    <article
      className="property-card rounded-4 bg-white overflow-hidden h-100 pe-none"
      aria-hidden
    >
      <div className="property-card-media position-relative overflow-hidden">
        <div className="skeleton-block w-100 h-100 rounded-0" />
      </div>
      <div className="property-card-body position-relative d-flex flex-column">
        <span className="skeleton-line skeleton-line-title rounded-3" />

        <div className="skeleton-fact d-flex align-items-center">
          <span className="skeleton-block skeleton-fact-icon flex-shrink-0 rounded-3" />
          <span className="skeleton-line skeleton-fact-text flex-grow-1 rounded-3" />
        </div>

        <div className="skeleton-features">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="skeleton-feature d-inline-flex align-items-center"
            >
              <span className="skeleton-block skeleton-feature-icon flex-shrink-0 rounded-3" />
              <span className="skeleton-line skeleton-feature-text rounded-3" />
            </div>
          ))}
        </div>
      </div>
    </article>
  </div>
);

export default PropertySkeleton;
