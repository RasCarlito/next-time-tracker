import $ from 'dominus'

const Password = () => (
  <div className='field password-component'>
    <label className='label'>Mot de passe</label>
    <p className='control has-icons-right'>
      <input type='password' name='password' className='input' placeholder='1 m0t D3 PaSs3 Tr3s C0mpL!qu3' required />
      <a className='icon is-small is-right' onClick={toggle}>
        <i className='fa fa-eye' />
      </a>
    </p>
    <style jsx>{`
      input[name=password] + a.icon {
        pointer-events: auto;
      }
    `}</style>
  </div>
)

export default Password

// ----------------
// Listeners
// ----------------

function toggle (e) {
  e.preventDefault()

  const $el = $(e.currentTarget)
  const $input = $el.prev()

  const currentType = $input.attr('type')

  $el.find('i.fa')
    .removeClass(currentType === 'password' ? 'fa-eye' : 'fa-eye-slash')
    .addClass(currentType === 'password' ? 'fa-eye-slash' : 'fa-eye')

  $input.attr('type', currentType === 'password' ? 'text' : 'password').focus()
}
