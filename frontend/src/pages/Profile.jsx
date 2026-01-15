import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import '../pages/css/Profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('token')
        const data = await apiRequest('/profile', 'GET', null, token) // token ajouté
        setUser(data)
      } catch (err) {
        console.error('Erreur chargement profil:', err)
      }
    }
    loadProfile()
  }, [])

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })

    const data = await res.json()
    setUser({ ...user, avatar: data.avatar })
  }

  if (!user) return <p>Chargement...</p>

  return (
    <div className="profile-container">
      <h1>Mon profil</h1>

      <img
        src={user.avatar || '/default-avatar.png'}
        className="profile-avatar"
      />

      <label className="upload-btn">
        Changer la photo
        <input type="file" hidden onChange={handleUpload} />
      </label>

      <div className="profile-info">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Inscrit le :</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  )
}
