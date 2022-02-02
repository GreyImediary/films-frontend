<template>
  <div class="home">
    <div>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="pagination.per_page"
        :page="pagination.current_page"
        :server-items-length="pagination.total"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
              flat
          >
            <v-toolbar-title>
              <router-link to="/">Фильмы</router-link>
            </v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-toolbar-title>
              <router-link to="/actors">Актёры</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog
                v-model="dialog"
                max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  Добавить
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                            v-model="editedItem.title"
                            label="Название"
                            outlined
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                            v-model="editedItem.director"
                            label="Режиссёр"
                            outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-textarea
                            v-model="editedItem.description"
                            label="Описание"
                            outlined
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Отмена
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Вы уверены, что хотите удалить этот фильм?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <img
              src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
              alt="edit"
              class="mr-2 action-button"
              @click="editItem(item)"
          />
          <img
              src="https://img.icons8.com/material-outlined/24/000000/filled-trash.png"
              alt="delete"
              class="action-button"
              @click="deleteItem(item)"
          />
        </template>

        <template v-slot:no-data>
          Нет данных
        </template>

        <template v-slot:footer>
          <v-pagination
              light
              class="data-table-pagination"
              v-model="pagination.current_page"
              :length="pagination.last_page"
              :total-visible="7"
              prev-icon="←"
              next-icon="→"

              @input="paginationInput"
          ></v-pagination>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  data: () => ({
    headers: [
      {
        text: "ID",
        align: 'start',
        value: "id",
      },
      {
        text: "Название",
        value: "title",
      },
      {
        text: "Описание",
        value: "description",
      },
      {
        text: "Режиссёр",
        value: "director",
      },
      {
        text: "Рейтинг",
        value: "rating",
      },
      {
        text: "Добавлен",
        value: "created_at",
      },
      {
        text: "Обновлён",
        value: "updated_at",
      },
      {
        text: "Действия",
        value: "actions",
      },
    ],
    items: [],
    pagination: {
      per_page: 0,
      current_page: 0,
      last_page: 0,
      total: 0,
    },
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      title: "",
      description: "",
      director: "",
    },
    defaultItem: {
      title: "",
      description: "",
      director: "",
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Добавить' : 'Изменить'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  async created () {
    await this.loadData();
  },

  methods: {
    ...mapActions(['loadFilms', 'createFilm', 'updateFilm', 'deleteFilm']),

    async loadData (page = 1) {
      const body = await this.loadFilms({ page: page });
      this.items = body.data;
      this.pagination = {
        per_page: body.meta.per_page,
        current_page: body.meta.current_page,
        last_page: body.meta.last_page,
        total: body.meta.total,
      };
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      const filmId = this.items[this.editedIndex].id;
      this.deleteFilm(filmId);
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        const body = await this.updateFilm({ filmId: this.editedItem.id, params: this.editedItem });
        this.items.splice(this.editedIndex, 1);
        this.items[this.editedIndex] = body.data;
      } else {
        await this.createFilm(this.editedItem);
        await this.loadData();
      }
      this.close()
    },

    async paginationInput (page) {
      await this.loadData(page);
    },
  },
}
</script>
