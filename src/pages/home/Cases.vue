<template>
  <div class="cases-page">
    <Header />

    <section class="cases-list">
      <ul v-if="reloadState">
        <li v-for="(item, index) in viewList" :key="index">
          <img :src="require(`@/i18n/${$i18n.locale}/cases/${item.img}`)" />
          <a class="cases-content" :href="`/cases/${item.filename}`">
            <div class="cases-title">{{ item.title }}</div>
            <div class="cases-detail">{{ item.info }}</div>
            <div class="cases-time">{{ item.date }}</div>
          </a>
        </li>
      </ul>

      <Pages
        align="right"
        :currentPage="currentPage"
        :split="split"
        :allPage="allList && allList.length"
        @page="toPage"
      />
    </section>

    <button v-if="!isAll" @click="clickReadMore">Read More</button>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader'
import Footer from '@/components/MainFooter'
import Pages from '@/components/Pages'
import tools from '@/assets/js/tools'

export default {
  name: 'News',
  components: { Header, Footer, Pages },
  data() {
    return {
      allList: [],
      viewList: [],
      currentPage: 1,
      split: 6,
      reloadState: true,
    }
  },
  computed: {
    isAll() {
      let { allList, viewList } = this
      return allList.length === viewList.length
    },
  },
  methods: {
    toPage(pageNum) {
      this.currentPage = pageNum
      let start = (pageNum - 1) * this.split
      this.viewList = this.allList.slice(start, start + this.split)
    },
    clickReadMore() {
      this.currentPage++
      let currentPage = this.currentPage
      let start = (currentPage - 1) * this.split
      let appendList = this.allList.slice(start, start + this.split)
      this.viewList = this.viewList.concat(appendList)
    },
    casesIndex(index) {
      let { currentPage, split, viewList } = this
      return viewList.length > split ? index : (currentPage - 1) * split + index
    },
  },
  mounted() {
    tools.changeTheme('#fdfeff')
    window.scrollTo(0, 0)
    this.reloadState = true
    this.allList = this.$t('cases.list')
    this.viewList = this.allList.slice(0, this.split)
  },
}
</script>

<style lang="scss" scoped>
@import './common.scss';

.cases-page {
  position: relative;
  overflow: hidden;
  font-family: 'Maven Pro', sans-serif;
  background: #fafcff;
}

.cases-list {
  font-family: Nunito;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    display: flex;
    width: 75rem;
    height: 15.5rem;
    margin-top: 1.25rem;
    padding: 3.125rem 2.635rem;
    background-color: #fff;
    box-shadow: 0px 8px 40px rgba(18, 43, 91, 0.08);
    border-radius: 12px;
    position: relative;

    .cases-title {
      color: #223355;
      font-weight: bold;
      font-size: 1.5rem;
      padding-bottom: 0.625rem;
    }

    .cases-detail {
      color: rgba(34, 51, 85, 0.8);
    }

    .cases-time {
      color: #c8ccde;
      position: absolute;
      left: 21.5rem;
      bottom: 2rem;
    }
  }

  img {
    min-width: 16.375rem;
    max-width: 16.375rem;
    height: 10.25rem;
    margin-right: 2.5rem;
  }

  .container {
    display: flex;
    flex-direction: column;

    padding-left: 2.25rem;
  }

  h4 {
    font-size: 1.625rem;
    margin-bottom: 1rem;
    max-height: 4.625rem;
    overflow: hidden;

    cursor: pointer;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.75rem;
    height: 8.75rem;
    margin-bottom: 1rem;
    overflow: hidden;
    color: #2f3032;

    cursor: pointer;

    /deep/ a {
      color: #3d75e3;
    }
  }
}

button {
  display: none;
}

/deep/ footer {
  margin-top: 11.25rem;
}

@media screen and (max-width: 60rem) {
  .news-page {
    min-width: 20rem;
  }
  .content {
    li {
      margin-bottom: 1.25rem;
      padding: 0;

      border-radius: 0.875rem;
      box-shadow: 0 1.25rem 3.75rem rgba(61, 117, 227, 0.06);

      a {
        max-width: initial;
      }
    }

    a {
      flex-direction: column;
    }

    img {
      max-width: 100%;
      min-width: 100%;
      height: initial;
      border-radius: 0.75rem 0.75rem 0 0;
    }

    .container {
      padding: 0 1.25rem;
    }

    h4 {
      font-size: 1.25rem;
      line-height: 1.75rem;
      margin-top: 1.25rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.5rem;
      height: 4.5rem;
    }

    span {
      font-size: 0.875rem;
      line-height: 1.5rem;
      margin-bottom: 1.25rem;
    }
  }

  button {
    display: block;
    margin: 5rem auto 7.5rem auto;
    font-size: 1.25rem;
    padding: 0 2rem;
    line-height: 3rem;

    font-family: 'Maven Pro', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    background: #3d75e3;
    color: #ffffff;
    border-radius: 0.625rem;
    border: 0.125rem solid #397ee4;

    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background: #fff;
      color: #3d75e3;
    }
  }

  /deep/ .pages {
    display: none;
  }

  /deep/ footer {
    margin-top: 0;
  }
}
</style>
