import {$peach} from '../../../lib/peach'

export default {
  name: 'peach-event',
  bind: function (el, binding) {
    el.addEventListener('click', function () {
      if (!binding.value.id || !binding.value.name) {
        return
      }
      $peach.pushEvent(binding.value.id, binding.value.name, binding.value.data)
    })
  }
}
