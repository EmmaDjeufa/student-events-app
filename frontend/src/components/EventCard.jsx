function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow space-y-2">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">{event.date}</p>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(event)}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Modifier
        </button>

        <button
          onClick={() => onDelete(event.id)}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default EventCard
