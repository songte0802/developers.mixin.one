<template>
  <div class="search-page">
    <Header />

    <section class="content">
      <div class="search-bar">
        <input
          type="text"
          v-model="search"
          @keydown.enter="handleEnterToSearch"
        />
        <i v-if="search" @click="search = ''" class="btn-close" />
      </div>
      <div class="search-content">
        <div class="head">
          <span
            v-for="key in ['all', 'news', 'cases', 'docs']"
            :key="key"
            :class="key === activeTab ? 'active' : ''"
            @click="handleClickTab(key)"
            >{{ $t(`search.${key}`) }}</span
          >
        </div>

        <p class="info" v-if="list.length > 0">
          {{ list.length }} results for
          <span class="keyword">"{{ searchKey }}"</span>
        </p>

        <ul class="search-list">
          <li v-for="(item, idx) in list" :key="idx" class="search-item">
            <h4 class="title">
              <router-link :to="item.router">
                {{ item.title }}
              </router-link>
            </h4>
            <span>{{ item.route }}</span>
            <p>{{ item.info }}</p>
          </li>
        </ul>

        <div class="no-result">
          <p>{{ $t('search.noresult') }}</p>
        </div>
        <!--        <div>Show more</div>-->
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/MainFooter'
import Header from '@/components/MainHeader'

let searchList = []
export default {
  name: 'Search',
  components: { Header, Footer },
  data() {
    return {
      search: '',
      searchKey: '',
      list: [],
      activeTab: 'all',
      searchList: [],
      pages: 0,
    }
  },
  methods: {
    handleEnterToSearch() {
      location.href = `/search?q=` + this.search
    },
    handleClickTab(key) {
      this.activeTab = key
      if (this.activeTab === 'all') {
        this.list = searchList
      } else {
        this.list = searchList.filter((item) => item.key === key)
      }
    },
  },
  created() {
    const { q } = this.$route.query
    if (q) {
      this.search = q
      this.searchKey = q
      const key = q.toLowerCase()
      const { vm, locale } = this.$i18n
      const { news, cases, documentation } = vm.messages[locale]
      const list = [
        ...getNewsOrCasesItem(news, 'news', locale, key),
        ...getNewsOrCasesItem(cases, 'cases', locale, key),
      ]
      const docsList = []
      getDocumentItem(
        documentation,
        this.$t('home.documentation.title') + ' > ',
        locale,
        key,
        docsList
      )
      searchList = [...docsList, ...list.sort((a, b) => b.date - a.date)]
      this.handleClickTab(this.activeTab)
    }
  },
}

function getNewsOrCasesItem(origin, info, locale, key) {
  const list = []
  for (const { title, filename, date } of origin.list) {
    const content = require(`@/i18n/${locale}/${info}/${filename}.md`).replace(
      /<(?:.|\s)*?>/g,
      ''
    )
    if (content.toLowerCase().includes(key))
      list.push({
        key: info,
        title,
        route: `${origin.route} > ${title}`,
        router: `/${info}/${filename}`,
        info: content.slice(0, 100) + '...',
        date: new Date(date),
      })
  }
  return list
}

function getDocumentItem(origin, route, locale, key, list) {
  for (const { child, name, path, router } of origin) {
    let route_name = route
    if (child) {
      route_name += `${name} > `
      getDocumentItem(child, route_name, locale, key, list)
    } else {
      const content = require(`@/i18n/${locale}/document/${router}.md`).replace(
        /<(?:.|\s)*?>/g,
        ''
      )
      if (content.toLowerCase().includes(key))
        list.push({
          key: 'docs',
          title: name,
          route: route + `${name}`,
          router: `/document/${path}`,
          info: content.slice(0, 100) + '...',
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common';

.content {
  padding: 0;
  background-color: #fff;
  padding: 2.5rem 5.25rem;
  box-shadow: 0px 8px 40px rgba(18, 43, 91, 0.08);
  border-radius: 20px;
  margin: 3.75rem auto;
  max-width: 75rem;
}

.search-bar {
  width: 100%;
  height: 54px;
  background: #f5f8fe;
  border-radius: 80px;
  display: flex;
  align-items: center;
  padding: 0 30px;

  input {
    flex: 1;
    background-color: transparent;
    height: 54px;
    font-size: 18px;
    width: 100%;
    color: #3f444e;
    margin-right: 20px;
  }
}

.search-content {
  padding: 32px;
  min-height: 30rem;

  .no-result {
    text-align: center;
    margin-top: 12rem;
  }
}

.head {
  border-bottom: 1px solid #edf1fa;
  padding: 8px 0;
  font-size: 1.125rem;

  span {
    padding: 8px 4px;
    margin-right: 36px;
    color: #223355;
    opacity: 0.6;
    cursor: pointer;
  }

  .active {
    opacity: 1;
    border-bottom: 2px solid #223355;
  }
}

.info {
  margin-top: 18px;
  color: rgba(34, 51, 85, 0.8);

  .keyword {
    color: #223355;
  }
}

.search-list {
  margin-top: 2rem;
}

.search-item {
  margin-bottom: 36px;

  .title a {
    font-size: 24px;
    color: #3d75e3;
    cursor: pointer;
  }

  span {
    display: inline-block;
    color: rgba(34, 51, 85, 0.4);
    margin: 8px 0 12px 0;
  }

  p {
    color: #223355;
  }
}

.btn-close {
  width: 20px;
  height: 20px;
  background: #bcbec3;
  border-radius: 50%;
  position: relative;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 9px;
    height: 2px;
    background-color: #fff;
  }

  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

@media screen and (max-width: 60rem) {
  .search-content {
    padding: 0 4px;
  }

  .search-bar {
    display: none;
  }

  .head {
    display: flex;
    justify-content: space-between;
    padding: 0;

    span {
      margin: 0;
    }
  }
}
</style>
