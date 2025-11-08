<script setup>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import usePokemonOptions from "@/composables/usePokemonOptions";

import { onMounted, ref } from "vue";
const { getPokemonOptions } = usePokemonOptions();

const pokemonArr = ref([]);
const pokemon = ref(null);
const showPokemon = ref(false);
const showAnswer = ref(false);
const message = ref("");
const hearts = ref(3);
const puntos = ref(0);

async function mixPokemonArray() {
  pokemonArr.value = await getPokemonOptions();

  const rndInt = Math.floor(Math.random() * 4);
  pokemon.value = pokemonArr.value[rndInt];
}
function checkAnswer(selectedId) {
  showPokemon.value = true;
  showAnswer.value = true;

  if (selectedId === pokemon.value.id) {
    message.value = `Correcto, ${pokemon.value.name}`;
    puntos.value = puntos.value + 1;

    if (puntos === 5 && hearts != 3) {
      hearts.value = hearts.value + 1;
    }
  } else {
    message.value = `Oops, era ${pokemon.value.name}`;
    hearts.value = hearts.value - 1;
  }
}
function newGame() {
  showPokemon.value = false;
  showAnswer.value = false;
  pokemonArr.value = [];
  pokemon.value = null;
  hearts.value = 3;
  puntos.value = 0;
  mixPokemonArray();
}
function tryGame() {
  showPokemon.value = false;
  showAnswer.value = false;
  pokemonArr.value = [];
  pokemon.value = null;
  mixPokemonArray();
}

onMounted(() => {
  mixPokemonArray();
});
</script>

<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <svg
      v-for="index in hearts"
      :key="index"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="with w-6 h-6"
    >
      <path
        d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
      />
    </svg>
    <svg
      v-for="index in 3 - hearts"
      :key="index"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="with w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>

    <h1>Puntaje: {{ puntos }}</h1>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer" />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>

      <div v-if="hearts">
        <button @click="tryGame">Nuevo intento</button>
      </div>
      <div v-if="!hearts">
        <button @click="newGame">Nuevo Juego</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.with {
  width: 30px;
}
</style>
