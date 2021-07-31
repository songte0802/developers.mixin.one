<template>
  <footer>
    <div class="container">
      <div class="resources">
        <a
          v-for="(item, index) in $t('home.footer.resources.list')"
          :key="index"
          :href="item.href"
          >{{ item.name }}</a
        >
        <li class="i18n">
          <div @click="toggleLocale" class="locale">
            {{ lang === 'zh' ? '中文' : 'English' }}
            <ul v-if="showLocale" class="select">
              <li @click="clickChangeLocale('zh')">中文</li>
              <li @click="clickChangeLocale('en')">English</li>
            </ul>
          </div>
        </li>
      </div>
      <ul class="community">
        <li v-for="(value, key) in $t('home.footer.community.list')" :key="key">
          <a :href="value.href">
            <div>
              <img
                :class="key"
                :src="require(`@/assets/img/footer/${key}.png`)"
              />
            </div>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      lang: '',
      showLocale: false,
    }
  },
  methods: {
    clickChangeLocale(lang) {
      this.$ls.set('lang', lang)
      window.location.reload()
    },
    toggleLocale() {
      this.showLocale = !this.showLocale
    },
  },
  mounted() {
    this.lang = this.$i18n.locale
  },
}
</script>

<style lang="scss" scoped>
footer {
  font-family: Nunito, sans-serif;
  margin-top: 30px;
  padding: 110px 0 30px 0;
}

.container {
  max-width: 63.75rem;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
}

.community {
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    cursor: pointer;

    div {
      width: 60px;
    }

    .twitter {
      width: 24px;
    }

    .github {
      width: 23px;
    }

    .facebook {
      width: 26px;
    }

    .youtube {
      width: 24px;
    }

    .reddit {
      width: 26px;
    }

    .telegram {
      width: 24px;
    }
  }
}

.resources {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 14px;
  line-height: 19px;

  &.en {
    min-width: 11rem;
  }

  &.zh {
    min-width: 9rem;
  }

  a {
    cursor: pointer;
    display: block;
    color: rgba(34, 51, 85, 0.8);
    margin-right: 24px;
  }
}

.i18n {
  .locale {
    display: inline-block;
    cursor: pointer;
    position: relative;
    color: rgba(34, 51, 85, 0.8);

    &::before {
      display: block;
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: 7px;
      right: -12px;
      border-width: 4px;
      border-style: solid;
      border-color: #000 transparent transparent transparent;
    }
  }

  .select {
    background-color: rgba($color: #fff, $alpha: 0.5);
    min-width: 70px;
    position: absolute;
    left: 0;
    top: 1.6rem;
    border-radius: 5px;
    border: 1px solid #eee;
    background: #fafcff;

    li {
      text-align: center;
      border-bottom: 1px solid #eee;
      line-height: 2rem;
    }
  }
}

@media screen and (max-width: 60rem) {
  footer {
    margin-top: 10rem;
    padding: 0 0 100px 2rem;

    .container {
      flex-direction: column;
      justify-content: start;
      width: initial;
      height: 100%;
      padding-top: 1.25rem;
    }

    h6 {
      margin-top: 5rem;
      margin-bottom: 2.625rem;
    }

    .community {
      ul {
        width: 100%;
        min-width: 18rem;
      }

      li {
        margin-bottom: 2rem;
      }
    }

    .resources {
      h6 {
        margin-top: 3rem;
      }

      li {
        margin-bottom: 1.88rem;
      }
    }
  }
}
</style>
