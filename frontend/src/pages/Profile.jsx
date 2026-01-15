import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import '../pages/css/Profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('token')
        const [oldPassword, setOldPassword] = useState('')
        const [newPassword, setNewPassword] = useState('')
        const [success, setSuccess] = useState('')
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
  async function handleChangePassword(e) {
    e.preventDefault()
    try {
      await apiRequest('/profile/password', 'PUT', { oldPassword, newPassword })
      setSuccess('Mot de passe mis à jour ✅')
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      alert(err.message)
    }
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
      // Formulaire JSX
      <form onSubmit={handleChangePassword}>
        <input type="password" placeholder="Mot de passe actuel" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
        <input type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <button type="submit">Modifier le mot de passe</button>
      </form>
      {success && <p>{success}</p>}
    </div>
    
  )
}
