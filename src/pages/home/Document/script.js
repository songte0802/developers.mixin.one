import Header from '@/components/MainHeader'
import Footer from '@/components/MainFooter'
import tools from '@/assets/js/tools'

import { getPathByRouter, getPageContent } from './handleMd'
import { handleCodeHighLight } from './hl'

export default {
  name: 'News',
  components: { Header, Footer },
  data() {
    return {
      page: '',
      active_path: '',
      path: '',
      showNav: false,
      locale: 'zh',
    }
  },
  computed: {
    githubView() {
      const { locale, path } = this
      return `https://github.com/MixinNetwork/developers.mixin.one/blob/main/developers/src/i18n/${locale}/document/${path}.md`
    },
    githubEdit() {
      const { locale, path } = this
      return `https://github.com/MixinNetwork/developers.mixin.one/edit/main/developers/src/i18n/${locale}/document/${path}.md`
    },
  },
  watch: {
    '$route.path'() {
      let { pathMatch } = this.$route.params
      handlePathInit.call(this, pathMatch)
      this.showNav = false
    },
  },
  methods: {
    insertGoogleTrans: function () {
      var style = document.createElement('style')
      style.type = 'text/css'
      let styling = ` 
      body > .skiptranslate:nth-child(1) {
        opacity: 0;
      }
      body {
        top: 0 !important;
      }
      `
      style.innerHTML = styling
      document.getElementsByTagName('head')[0].appendChild(style)
      var gscript = document.createElement('script')
      gscript.setAttribute('type', 'text/javascript')
      gscript.innerHTML = `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
      }
      `
      document.getElementsByTagName('body').item(0).appendChild(gscript)
      var script = document.createElement('script')
      script.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      )
      script.setAttribute('type', 'text/javascript')
      document.getElementsByTagName('body').item(0).appendChild(script)
    },
  },
  mounted() {
    this.insertGoogleTrans()
    tools.changeTheme('#fff')
    let { pathMatch } = this.$route.params
    handlePathInit.call(this, pathMatch)
  },
}

function handlePathInit(pathMatch) {
  this.$nextTick(() => {
    handleCodeHighLight()
    document.documentElement.scrollTop = 0
  })
  pathMatch = pathMatch ? pathMatch.substr(1) : 'mainnet/overview'
  let { locale, messages } = this.$i18n
  let langCheck = new Set()
  langCheck.add(locale)
  langCheck.add('en')
  langCheck.add('zh')
  langCheck = Array.from(langCheck)
  let isFind = langCheck.some((item) =>
    getPathByRouter.call(
      this,
      pathMatch,
      (messages[item] && messages[item].documentation) || []
    )
  )
  if (!isFind) return console.log('no doc')
  isFind = langCheck.some((item) => getPageContent.call(this, item))
  if (!isFind) console.log('no doc2')
}
