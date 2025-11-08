import { mount } from "@vue/test-utils";
import PokemonOptions from "@/components/PokemonOptions.vue";

describe("PokemonOptions.vue", () => {
  const pokemons = [
    { id: 1, name: "Pikachu" },
    { id: 2, name: "ivysaur" },
    { id: 3, name: "venusaur" },
  ];

  it("It must render the Pokémon names.", () => {
    const wrapper = mount(PokemonOptions, {
      props: { pokemons },
    });

    const liElements = wrapper.findAll("li");
    expect(liElements).toHaveLength(3);
    expect(liElements[0].text()).toBe("Pikachu");
    expect(liElements[1].text()).toBe("ivysaur");
  });

  it('It must emit the "selectionPokemon" event when clicked.', async () => {
    const wrapper = mount(PokemonOptions, {
      props: { pokemons },
    });

    const liElements = wrapper.findAll("li");
    await liElements[1].trigger("click");

    expect(wrapper.emitted("selectionPokemon")).toBeTruthy();

    expect(wrapper.emitted("selectionPokemon")[0]).toEqual([2]);
  });
});
