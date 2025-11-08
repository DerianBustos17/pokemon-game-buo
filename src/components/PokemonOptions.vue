<script setup>
defineProps({
  pokemons: {
    type: Array,
    required: true,
  },
});
defineEmits(["selectionPokemon"]);
</script>
<template>
  <div class="options-container">
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        @click="$emit('selectionPokemon', pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}

li {
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 15px;
  width: 350px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>
