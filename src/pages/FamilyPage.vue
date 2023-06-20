<template>
  <div class="container">
    <div class="myTitle">
      <h1>mi familia</h1>
    </div>

    <div v-if="myFamilieswithMembers.length == 0">
      <p>You are not in any family.</p>
      <p>Click the button below to create or join a family.</p>
    </div>
    <div class="button-container">
      <button @click="openSearchModal" class="button-74">Search Family</button>
      <button
        @click="openCreateModal"
        class="button-74"
        style="margin-left: 15px;"
      >
        Create Family
      </button>
    </div>

    <b-modal v-model="showSearchModal" title="Search Family" hide-footer class="Modal">
      <div>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter family name"
        />
        <div class="modal-footer">
          <b-button @click="searchFamily" variant="success">Search</b-button>

          </div>

        <table v-if="searchResults.length > 0" class="search-results-table">
          <thead>
            <tr>
              <th>Family Name</th>

              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in searchResults" :key="result.family_id">
              <td>{{ result.name }}</td>

              <td>
                <button @click="addFamily(result, true)" class="button-74">
                  Join
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No results found.</p>
      </div>
    </b-modal>

      <b-modal
        v-model="showCreateModal"
        size="lg"
        title="Create Family"
        hide-footer
        class="Modal"
      >
      <form @submit.prevent="createFamily">
        <label for="familyLastName">Family Name:</label>
        <input
          type="text"
          id="familyLastName"
          v-model="newFamily.Family_name"
          placeholder="Enter Family Name"
          required
        />

        <div class="modal-footer">
          <b-button type="submit"  variant="success">Create</b-button>
          </div>
      </form>
    </b-modal>

    <ul style="margin-top: 35px;">
      <div class="myTitle">
        <h2>My Families</h2>
      </div>
      <tbody>
        <div
          v-for="family in myFamilieswithMembers"
          :key="family.family.family_id"
          style="margin-bottom: 15px;"
        >
          <tr>
            <td style="color: white;">
              <button
                @click="toggleFamilyMembers(family)"
                class="button-89"
                style=""
              >
                {{ family.showMembers ? "-" : "+" }}
              </button>
              <router-link
                :to="{
                  name: 'familyRecipes',
                  params: {
                    id: family.family.family_id,
                    name: family.family.name,
                  },
                }"
              >
                {{ family.family.name }}
              </router-link>
            </td>
          </tr>
          <tr v-if="family.showMembers">
            <td colspan="2">
              <table class="sub-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in family.members" :key="member.username">
                    <td>{{ member.username }}</td>
                    <td>{{ member.firstname }} {{ member.lastname }}</td>
                    <td>{{ member.email }}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </div>
      </tbody>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FamilyPage",
  components: {},
  data() {
    return {
      myFamilieswithMembers: [],
      showSearchModal: false,
      showCreateModal: false,
      searchQuery: "",
      searchResults: [],
      newFamily: {
        Family_name: "",
      },
    };
  },
  methods: {
    async toggleFamilyMembers(family) {
      console.log("toggleFamilyMembers", family);
      family.showMembers = !family.showMembers;
    },
    openSearchModal() {
      this.showSearchModal = true;
    },

    openCreateModal() {
      this.showCreateModal = true;
    },
    async searchFamily() {
      try {
        // Perform the search request using the searchQuery value
        const response = await this.$store.dispatch("searchFamily", {
          query: this.searchQuery,
        });
        if (response.status === 200) {
          this.searchResults = response.data;
        } else {
          this.searchResults = [];
        }
      } catch (error) {
        console.error(error);
        this.searchResults = [];
      }
    },

    async addFamily(family, isAdd) {
      // Implement the logic to add the selected family to the list of "myFamilies" or perform any other desired action
      try {
        this.showSearchModal = false;
        const response = await this.$store.dispatch("joinFamily", {
          familyId: family.family_id,
          isAdd: isAdd,
        });
        if (response.status === 204) {
          this.$root.toast(
            "Search Family",
            "successfully to the family",
            "success"
          );
        } else {
          this.$root.toast(
            "Search Family",
            "failed to add to the family",
            "danger"
          );
        }
        this.updateFamily();
      } catch (error) {
        this.$root.toast(
          "Search Family",
          "failed to add to the family",
          "danger"
        );
        this.searchResults = [];
      }
    },
    async createFamily() {
      // Implement the logic to create a new family
      // Close the modal after creating the family
      try {
        this.showCreateModal = false;
        const response = await this.$store.dispatch("createFamily", {
          family_name: this.newFamily.Family_name,
        });
        if (response.status === 201) {
          this.$root.toast(
            "Create Family",
            "successfully created the family",
            "success"
          );
        } else {
          this.$root.toast(
            "Create Family",
            "failed to create the family",
            "danger"
          );
          this.newFamily.Family_name = "";
        }
        this.updateFamily();
      } catch (error) {
        console.error(error);
        this.$root.toast(
          "Create Family",
          "failed to create the family",
          "danger"
        );
        // Reset the form fields
        this.this.newFamily.lastName = "";
      }
    },
    async updateFamily() {
      try {
        this.myFamilieswithMembers = [];
        let response = await this.$store.dispatch("myFamilies");
        if (!response.status == 200) {
          this.$router.push("/");
          return;
        }
        this.myFamilies = response.data;
        if (this.myFamilies.length > 0) {
          this.myFamilies.map(async (family) => {
            let response = await this.$store.dispatch("getFamilyMembers", {
              familyId: family.family_id,
            });
            if (response.status == 200 && response.data.length > 0) {
              this.myFamilieswithMembers.push({
                family: family,
                members: response.data,
                showMembers: false,
              });
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    this.updateFamily();
  },
};
</script>

<style scoped>
/* CSS */
.button-89 {
  --b: 3px; /* border thickness */
  --s: 0.45em; /* size of the corner */
  --color: #373b44;

  padding: calc(0.5em + var(--s)) calc(0.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background: conic-gradient(
      from 90deg at var(--b) var(--b),
      #0000 90deg,
      var(--color) 0
    )
    var(--_p) var(--_p) / calc(100% - var(--b) - 2 * var(--_p))
    calc(100% - var(--b) - 2 * var(--_p));
  transition: 0.3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: 0.6em;
  font-size: 16px;
  align-self: center;
  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-89:hover,
.button-89:focus-visible {
  --_p: 0px;
  outline-color: var(--color);
  outline-offset: 0.05em;
}

.button-89:active {
  background: var(--color);
  color: #fff;
}

.family-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table_responsive {
  max-width: 900px;
  border: 1px solid #312415;
  background-color: #efefef33;
  padding: 15px;
  overflow: auto;
  margin: auto;
  border-radius: 4px;
}
table {
  width: 100%;
  font-size: 13px;
  color: #444;
  white-space: nowrap;
  border-collapse: separate;

  background-color: #fff;
  border-radius: 4px;
  border-color: #312415;
}
a {
  font-size: 30px;

  color: #444;
}

table > thead {
  background-color: #fbeee0;
  color: #422800;
}
table > thead th {
  padding: 15px;
}
table th,
table td {
  border: 1px solid #312415;
  padding: 10px 15px;
  font-size: 25px;
}
table > tbody > tr > td > img {
  display: inline-block;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 6px #0003;
}
</style>
