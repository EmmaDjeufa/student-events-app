function EventCard({ event }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">{event.date}</p>
    </div>
  )
}

export default EventCard
