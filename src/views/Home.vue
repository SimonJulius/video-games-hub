<template>
  <div class="home">
    <nav-bar />
    <section class="main">
      <div class="filters">
        <div class="contents">
          <header>Filter Results</header>
          <div class="filter-by-name">
            <Input
              :label="'Name(Contains)'"
              :placeholder="'Text String'"
              :type="'text'"
              v-model="filterParameters.gameName"
              @keyup.enter="triggerFilter('name')"
            />
          </div>
          <div class="results">
            <div class="minimum_score">
              <Input
                :label="'Minimum Score'"
                :placeholder="'1 - 100'"
                :type="'number'"
                :min="1"
                :max="100"
                v-model.number="filterParameters.minimumScore"
                @keydown="acceptOnlyNumber"
                @keyup.enter="triggerFilter('minimum rate')"
              />
              <notifications
                group="auth"
                position="bottom right"
                classes="min_score-notification"
              />
            </div>
            <div class="select">
              <div class="title">Order By</div>
              <div class="select_body">
                <div class="arrow" @click="() => orderGames(orderBy)">
                  <font-awesome-icon icon="arrow-up" />
                </div>
                <custom-select
                  v-model="orderBy"
                  :options="options"
                  :tabindex="1"
                  :className="'custom-select'"
                  @select="onSelect"
                  @onSelectOpen="setClearButtonClass"
                />
                <button
                  @click="clearAllInputs"
                  :class="[
                    isClearButtonDown ? 'push_down' : '',
                    isDesktop ? 'set_position' : '',
                  ]"
                  class="clear"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="games">
        <game-card
          v-for="(game, index) in games"
          :key="index"
          :body="game.summary"
          :subtitle="game.releaseDate"
          :title="game.name"
          :score="game.rating"
        />
        <div v-if="isLoading">
          <content-loader
            v-for="i in 5"
            :key="i"
            :width="810"
            :height="150"
            :speed="3"
            primaryColor="#b0b0b0"
            secondaryColor="#ecebeb"
          >
            <rect x="5" y="0" rx="3" ry="3" width="810" height="150" />
          </content-loader>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';
import GameCard from '@/components/GameCard.vue';
import dayjs from 'dayjs';
import { vueWindowSizeMixin } from 'vue-window-size/option-api';

interface Ifilters {
  [key: string]: any;
}

const url = 'https://public.connectnow.org.uk/applicant-test/';

export default defineComponent({
  name: 'Home',
  components: {
    NavBar,
    GameCard,
  },
  data() {
    return {
      value: '',
      options: ['Release Date', 'Score', 'Name'],
      isClearButtonDown: false,
      filterParameters: { gameName: null, minimumScore: null } as Ifilters,
      orderBy: '',
      warningMessage: '',
      games: [] as any,
      isGameLoaded: false,
      isLoading: false,
      isDesktop: true,
      dayjs,
      url,
    };
  },
  async created() {
    this.games = await this.getGames(url);
    this.screenIsDesktop();
  },
  mixins: [vueWindowSizeMixin()],
  methods: {
    screenIsDesktop() {
      const isDesktopSize = this.$windowWidth > 768 || this.$windowWidth < 480;
      this.isDesktop = isDesktopSize;
      return isDesktopSize;
    },
    onSelect(event: string) {
      this.orderBy = event;
    },
    setClearButtonClass() {
      let screenIsDesktop = this.screenIsDesktop();
      this.isClearButtonDown = !this.isClearButtonDown && screenIsDesktop;
      console.log(this.isClearButtonDown, screenIsDesktop);
    },
    async clearAllInputs() {
      Object.keys(this.filterParameters).forEach((propertyName) => {
        this.filterParameters[propertyName] = null;
      });
      await this.getGames(url);
    },
    acceptOnlyNumber(event: any) {
      const key = event.key;
      if (key === '.' || key === '-' || key === 'e')
        return event.preventDefault();
    },
    preventEntryGreater100OrLessThan1() {
      if (
        this.filterParameters.minimumScore < 1 ||
        this.filterParameters.minimumScore > 100
      ) {
        this.warningMessage = 'Please enter only number between 1 and 10';
        this.$notify({
          title: 'Oops!',
          text: this.warningMessage,
          type: 'info',
          duration: 5000,
        });
        this.filterParameters.minimumScore = null;
      }
    },

    async triggerFilter(paramType: string) {
      try {
        if (paramType === 'minimum rate') {
          this.preventEntryGreater100OrLessThan1();
          const games = await this.filter(this.filterParameters.minimumScore);
          this.games = games;
        } else {
          const games = await this.filter(this.filterParameters.gameName);
          this.games = games;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getGames(url: string) {
      try {
        this.isLoading = true;
        const { data } = await this.axios.get(url);
        const formattedData = data.map((datum: any) => {
          const clonedDatum = Object.assign({}, datum);
          clonedDatum.releaseDate = this.dayjs(
            clonedDatum['first_release_date']
          ).format('DD/MM/YYYY');

          clonedDatum.releaseDate = `Was loaded ${clonedDatum.releaseDate}`;
          clonedDatum.rating = Math.round(clonedDatum.rating);
          return clonedDatum;
        });
        return formattedData;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    typeOfParameter(parameter: string | number) {
      let type = '';
      switch (typeof parameter) {
        case 'number':
          type = 'minimum rate';
          break;
        case 'string':
          type = 'name';
          break;
        default:
          type = 'unkown';
          break;
      }
      return type;
    },

    async filter(filterParam: string | number) {
      const typeOfParam = this.typeOfParameter(filterParam);
      let games = await this.getGames(url);
      if (typeOfParam === 'minimum rate') {
        games = games.filter((game: any) => {
          return game.rating >= filterParam;
        });
      } else if (typeOfParam === 'name') {
        if (typeof filterParam !== 'string') return;
        games = games.filter((game: any) => {
          const gameName = game.name.toLowerCase();
          const searchItem = filterParam.toLowerCase();
          return gameName.includes(searchItem);
        });
      }
      return games;
    },

    orderGames(orderParam: string) {
      orderParam = orderParam.toLowerCase();
      switch (orderParam) {
        case 'name':
          this.games.sort((a: any, b: any) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case 'release date':
          this.games.sort(
            (a: any, b: any) =>
              a['first_release_date'] - b['first_release_date']
          );
          break;
        case 'score':
          this.games.sort((a: any, b: any) => {
            return a.rating - b.rating;
          });
          break;
        default:
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../assets/_variables.scss';
.main {
  display: flex;
  .filters {
    flex: 2 2 20%;
    background: #091627;
    & .contents {
      position: sticky;
      top: 0;
      //
      padding: 5% 10% 0 10%;
      width: 70%;
      background: #101d2f;
      height: 55vh;
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      margin-left: 20%;

      header {
        margin-bottom: 2.479rem;
      }

      & > div {
        margin-bottom: 1.8rem;
        font-size: 12px;

        .title {
          margin-bottom: 4%;
        }
        & > div {
          margin-bottom: 1.8rem;
        }
      }
    }

    .clear {
      position: relative;
      border: none;
      padding: 0.2rem 0.7rem;
      font-size: 12px;
      &.set_position {
        position: absolute;
        right: 0;
        top: 110%;
      }
      &.push_down {
        top: 410%;
      }
    }
  }

  .games {
    flex: 5 5 50%;
    padding-right: 8vw;
    margin-left: 8rem;
    background: #091627;
  }
  .select_body {
    display: flex;
    position: relative;
    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $buttonColor;
      flex-basis: 20%;
    }
  }
}

@media screen and (max-width: $tablet) {
  .main {
    flex-direction: column;
    .filters {
      & .contents {
        padding: 5% 3%;
        width: 90%;
        margin-left: 5%;

        & > div {
          margin-bottom: 0.2rem;
          .title {
            margin-bottom: 1.5%;
          }
        }
      }

      .clear {
        padding: 0.4rem 0.7rem;
        display: inline;
        margin-left: 7%;
      }

      .results {
        display: flex;
        .minimum_score {
          width: 25%;
        }
      }
    }
    .select {
      margin-left: 2rem;
      width: 60%;
    }
    .select_body {
      justify-content: space-between;
      width: 116%;
    }
  }
}
@media screen and (max-width: $mobile) {
  .main {
    .results {
      display: flex;
      flex-direction: column;
      & > div {
        width: 100%;
      }
      .minimum_score {
        width: 100% !important;
      }
    }
    .select {
      margin-left: 0rem;
    }
    .filters {
      flex: 2 2 20%;
      background: #091627;
      & .contents {
        position: sticky;
        top: 0;
        padding: 4% 5% 0 5%;
        width: 80%;
        margin-left: 10%;

        header {
          margin-bottom: 2.479rem;
        }

        & > div {
          margin-bottom: 1.8rem;
          font-size: 12px;

          .title {
            margin-bottom: 4%;
          }
          & > div {
            margin-bottom: 1.8rem;
          }
        }
      }

      .clear {
        padding: 0.4rem 0.7rem;
        display: inline;
        margin-left: 7%;
        &.set_position {
          position: absolute;
          width: 100%;
          top: 200%;
        }
      }
    }

    .games {
      margin-top: 2rem;
      margin-left: 2.5rem;
    }
    .select_body {
      width: 100%;
    }
  }
}
</style>
