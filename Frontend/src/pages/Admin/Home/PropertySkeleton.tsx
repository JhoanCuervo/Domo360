/** Marcador de carga con la forma de una tarjeta de inmueble. */
const PropertySkeleton = () => (
  <div className="col-12 col-md-6 col-xl-4">
    <article className="property-card property-card-skeleton h-100" aria-hidden>
      <div className="property-card-media">
        <div className="skeleton-block skeleton-media" />
      </div>
      <div className="property-card-body">
        <span className="skeleton-line skeleton-line-title" />

        <div className="skeleton-fact">
          <span className="skeleton-block skeleton-fact-icon" />
          <span className="skeleton-line skeleton-fact-text" />
        </div>

        <div className="skeleton-features">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="skeleton-feature">
              <span className="skeleton-block skeleton-feature-icon" />
              <span className="skeleton-line skeleton-feature-text" />
            </div>
          ))}
        </div>
      </div>
    </article>
  </div>
);

export default PropertySkeleton;
