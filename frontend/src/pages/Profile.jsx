import { useEffect, useState } from 'react'
import { apiRequest } from '../api/api'
import '../pages/css/Profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiRequest('/profile')
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

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/avatar`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        }
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      const data = await res.json()
      setUser(prev => ({ ...prev, avatar: data.avatar }))
    } catch (err) {
      console.error('Erreur upload avatar:', err)
    }
  }


  async function handleChangePassword(e) {
    e.preventDefault()
    try {
      await apiRequest('/profile/password', 'PUT', { oldPassword, newPassword })
      setSuccess('Mot de passe mis à jour ✅')
      setOldPassword('')
      setNewPassword('')
      setShowPasswordForm(false)
    } catch (err) {
      alert(err.message || 'Erreur lors de la modification du mot de passe')
    }
  }

  if (!user) return <p>Chargement...</p>

  return (
    <div className="profile-container">
      <h1>Mon profil</h1>

      <img
        src={user.avatar || 'https://ui-avatars.com/api/?name=' + user.name}
        alt="Avatar"
        className="profile-avatar"
      />


      <label className="upload-btn">
        Modifier la photo
        <input type="file" hidden onChange={handleUpload} />
      </label>

      <div className="profile-info">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role.toUpperCase()}</p>
        <p><strong>Inscrit le :</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      <button className="toggle-password-btn" onClick={() => setShowPasswordForm(!showPasswordForm)}>
        {showPasswordForm ? 'Annuler changement mot de passe' : 'Changer le mot de passe'}
      </button>

      {showPasswordForm && (
        <form onSubmit={handleChangePassword} className="password-form">
          <input
            type="password"
            placeholder="Mot de passe actuel"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Modifier le mot de passe</button>
        </form>
      )}

      {success && <p className="success-msg">{success}</p>}
    </div>
  )
}
