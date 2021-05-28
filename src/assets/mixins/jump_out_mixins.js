import { setTransform } from '../utils/_el_transform'

export const mixins = {
  mounted() {
    const { type, ref, percent, side } = this.$route.query
    if (type && type === 'new') {
      this.$nextTick(() => {
        setTransform(this.refs[ref], percent, side)
      })
    }
  }
}
