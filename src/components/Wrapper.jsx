function Wrapper({ pagination, operatingBar, children }) {
  return (
    <div className="white-card" style={{ marginTop: 10 }}>
      {(pagination || operatingBar) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
        >
          {pagination && <div>{pagination}</div>}
          {operatingBar && <div>{operatingBar}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export default Wrapper
