<template>
  <div :class="['home-page', $i18n.locale]" ref="root">
    <Header />

    <!--  -->
    <div class="main-section">
      <div class="main-title">
        <h2>
          {{ $t('home.main.title') }}
        </h2>
        <ul>
          <li v-for="(item, index) in $t('home.main.info')" :key="index">
            <img class="check" src="@/assets/img/app-svg/check.svg" />
            <span v-html="item"></span>
          </li>
          <div class="router-list">
            <a
              v-for="(item, index) in $t('home.main.button')"
              :key="index"
              :href="mainRoute[index]"
              :target="'_blank'"
              class="button"
              >{{ item }}</a
            >
          </div>
        </ul>
      </div>
      <div>
        <img class="main-bg" src="@/assets/img/svg/home_head.svg" />
      </div>
    </div>

    <!--  -->
    <section class="latest-news">
      <h2>{{ $t('news.title') }}</h2>
      <ul>
        <li v-for="(item, index) in $t('news.list').slice(0, 8)" :key="index">
          <img class="news-img" src="@/assets/img/svg/news.svg" />
          <div class="news-content">
            <a :href="'/news/' + item.filename" class="title">{{
              item.title
            }}</a>
            <div class="time">{{ item.date }}</div>
          </div>
        </li>
      </ul>
      <router-link class="button" to="/news" tag="a">{{
        $t('home.button.readmore')
      }}</router-link>
    </section>

    <!--  -->
    <section class="user-cases">
      <h2>{{ $t('cases.title') }}</h2>
      <ul>
        <li v-for="(item, index) in $t('cases.list').slice(0, 8)" :key="index">
          <img class="user-cases-img" src="@/assets/img/svg/news.svg" />
          <div class="user-cases-content">
            <a :href="'/cases/' + item.filename" class="title">{{
              item.title
            }}</a>
            <a
              :href="'/cases/' + item.filename"
              :class="'info info-' + item.clamp"
              >{{ item.info }}</a
            >
            <div class="time">{{ item.date }}</div>
          </div>
        </li>
      </ul>
      <a class="button" href="cases">{{ $t('home.button.readmore') }}</a>
    </section>

    <section class="documentation">
      <h2>{{ $t('home.documentation.title') }}</h2>
      <ul>
        <li>
          <img class="documentation-img" src="@/assets/img/svg/mainnet.svg" />
          <div class="documentation-content">
            <a href="/document/mainnet/overview" class="title">Mainnet</a>
            <a href="/document/mainnet/overview" class="info"
              >F1EX, a stand alone exchange product by Fox.ONE, with low
              token-issuance cost, ....F1EX, a stand alone exchange product by
              Fox.ONE, with low token-issuance cost</a
            >
          </div>
        </li>
        <li>
          <img class="documentation-img" src="@/assets/img/svg/wallet.svg" />
          <div class="documentation-content">
            <a href="/document/wallet/overview" class="title">Wallet</a>
            <a href="/document/wallet/overview" class="info"
              >F1EX, a stand alone exchange product by Fox.ONE, with low
              token-issuance cost, ....F1EX, a stand alone exchange product by
              Fox.ONE, with low token-issuance cost</a
            >
          </div>
        </li>
        <li>
          <img class="documentation-img" src="@/assets/img/svg/bot.svg" />
          <div class="documentation-content">
            <a href="/document/bot/overview" class="title">Bot</a>
            <a href="/document/bot/overview" class="info"
              >F1EX, a stand alone exchange product by Fox.ONE, with low
              token-issuance cost, ....F1EX, a stand alone exchange product by
              Fox.ONE, with low token-issuance cost</a
            >
          </div>
        </li>
        <li>
          <img class="documentation-img" src="@/assets/img/svg/academy.svg" />
          <div class="documentation-content">
            <a href="/document/knowledge/glossary/cryptocurrency" class="title"
              >Academy</a
            >
            <a href="/document/knowledge/glossary/cryptocurrency" class="info"
              >F1EX, a stand alone exchange product by Fox.ONE, with low
              token-issuance cost, ....F1EX, a stand alone exchange product by
              Fox.ONE, with low token-issuance cost</a
            >
          </div>
        </li>
      </ul>
    </section>

    <!--  -->
    <section class="next-step">
      <h2>{{ $t('home.nextstep.title') }}</h2>
      <div class="container">
        <ul class="section section1">
          <img class="step-img" src="@/assets/img/svg/quotation.svg" />
          <li v-for="(item, index) in $t('home.nextstep.left')" :key="index">
            <p>{{ item.info }}</p>
            <a href="dashboard" class="button">{{ item.button }}</a>
          </li>
        </ul>
        <div class="section section2">
          <ul>
            <li v-for="(item, index) in $t('home.nextstep.right')" :key="index">
              <p>{{ item.info }}</p>
              <a href="#">Contact XXXX</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/MainHeader'
import Footer from '@/components/MainFooter'
import tools from '@/assets/js/tools'
export default {
  name: 'Home',
  components: { Header, Footer },
  data() {
    return {
      mainRoute: ['/document', '/dashboard'],
    }
  },
  mounted() {
    tools.changeTheme('#fff')
    require('@/assets/js/resize-first')
  },
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
