import { mount } from "@vue/test-utils";
import PokemonPicture from "@/components/PokemonPicture.vue";

describe("PokemonPicture.vue", () => {
  it("It must display the hidden Pokémon when showPokemon is false.", () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: 25,
        showPokemon: false,
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.classes()).toContain("hidden-pokemon");
    expect(img.attributes("src")).toContain("25.svg");
  });

  it("It must display the visible Pokémon when showPokemon is true.", () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: 7,
        showPokemon: true,
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.classes()).toContain("fade-in");
    expect(img.attributes("src")).toContain("7.svg");
  });
});
