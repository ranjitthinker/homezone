<div className="search-master-wrapper" ref={wrapperRef}>
  <div className={`search-island-pill ${isFocused ? 'is-focused' : ''}`}>
    
    <div style={{ minWidth: '120px', flexShrink: 0 }}>
      <SelectDropdown onChange={(selected) => setCityId(selected?.value || '')} />
    </div>

    <button
      type="button"
      className="btn-detect ms-2"
      onClick={handleAutoDetectLocation}
    >
      <span className="fa fa-map-marker-alt" />
    </button>

    <div className="pill-divider" />

    <div style={{ position: 'relative', flexGrow: 1 }}>
      <input
        className="invisible-input"
        type="text"
        placeholder="Search properties..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
    </div>

    <div className="d-flex align-items-center ms-2 gap-1">
      <button
        className="btn-text-only"
        data-bs-toggle="modal"
        data-bs-target="#advanceSeachModalTwo"
      >
        Advanced
      </button>

      <button className="btn-solid-action" onClick={handleSearchSubmit}>
        Search
      </button>
    </div>
  </div>
</div>