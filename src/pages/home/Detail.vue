<template>
  <div class="detail-page">
    <Header />

    <section class="content">
      <!-- <nav>
        <router-link tag="a" :to="`/${path}`">{{route}}</router-link>
        <span>> {{info.title}}</span>
      </nav>-->

      <h2>{{ info.title }}</h2>

      <p class="date">{{ info.date }}</p>

      <div class="desc markdown-body" v-html="desc"></div>

      <!-- <img src="@/assets/img/svg/black_logo.svg" /> -->
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader'
import Footer from '@/components/MainFooter'
import tools from '@/assets/js/tools'
import 'github-markdown-css'

export default {
  name: 'NewsDetail',
  components: { Header, Footer },
  data() {
    return {
      route: '',
      info: {},
      path: '',
      desc: '',
    }
  },
  mounted() {
    tools.changeTheme('#fdfeff')
    window.scrollTo(0, 0)
    let { filename: _filename } = this.$route.params
    let path = ''

    let { name } = this.$route
    if (name.startsWith('news')) {
      path = 'news'
    } else if (name.startsWith('cases')) {
      path = 'cases'
    }
    this.path = path
    this.route = this.$t(path + '.route')

    this.info = this.$t(path + '.list').find(
      (item) => item.filename === _filename
    )
    let { locale } = this.$i18n
    let { filename } = this.info
    if (filename) {
      try {
        this.desc = require(`@/i18n/${locale}/${path}/${this.info.filename}.md`)
      } catch (e) {
        this.desc = require(`@/i18n/en/${path}/${this.info.filename}.md`)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.detail-page {
  .content {
    margin: 3.75rem auto;
    max-width: 75rem;
    padding: 5.1875rem 6.25rem;

    display: flex;
    flex-direction: column;

    background: #ffffff;
    box-shadow: 0px 8px 40px rgba(18, 43, 91, 0.08);
    border-radius: 1.25rem;
    font-family: Nunito, sans-serif;
  }

  nav {
    font-size: 1.25rem;

    span {
      padding-left: 0.5rem;
      color: #c7c9d2;
    }
  }

  h2 {
    font-size: 2rem;
    color: #223355;
  }

  .date {
    margin-top: 1.875rem;
    line-height: 1.5rem;

    color: #c8ccde;
  }

  /deep/ .desc {
    margin-top: 2.75rem;
    color: #223355;
    font-size: 1.125rem;

    li {
      list-style: initial;
    }
  }

  img {
    align-self: flex-end;
    margin: 1.75rem 0 5rem;
  }

  /deep/ footer {
    margin-top: 10rem;
  }

  /deep/ pre {
    background: #f8f8f8;
    border-radius: 12px;
    color: #223355;
    padding: 1.875rem 4rem;
    margin: 1.875rem 0;
  }
}

@media screen and (max-width: 75rem) and (min-width: 60.0625rem) {
  .content {
    max-width: 40rem;
  }
}

@media screen and (max-width: 60rem) {
  .detail-page {
    background: #fff;

    .content {
      margin-top: 1.875rem;
      padding: 0 1.25rem 0;
      box-shadow: none;
    }

    nav {
      font-size: 0.875rem;
    }

    h2 {
      margin-top: 1.25rem;
      font-size: 1.5rem;
    }

    .date {
      margin-top: 0.625rem;
      font-size: 0.875rem;
      color: #c7c9d2;
    }

    .desc {
      margin-top: 0.625rem;
    }

    img {
      margin: 1.75rem 1.25rem 0 0;
    }

    /deep/ footer {
      margin-top: 7.5rem;
    }
  }
}
</style>
