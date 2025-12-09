const ClientsSection = ({ clients }) => {
  return (
    <section id="clients" className="section happy-clients">
     

      <div className="clients-row">
        {clients.map((client) => (
          <div key={client._id} className="client-card-v2">
            <div className="client-avatar-wrapper">
              <img
                src={client.imageUrl}
                alt={client.name}
                className="client-avatar"
              />
            </div>

            <p className="client-quote">{client.description}</p>

            <div className="client-meta">
              <span className="client-name">{client.name}</span>
              <span className="client-role">{client.designation}</span>
            </div>
          </div>
        ))}

        {clients.length === 0 && (
          <p className="center" style={{ marginTop: "24px" }}>
            No clients yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
