const app = Vue.createApp({
  data() {
    return {
      userValidity: false,
      doughPerPizza: "",
      totalDough: "",
      ingredients: {
        pizzaNumber: "",
        pizzaSize: "",
        pizzaStyle: "Napolitan",
        yeastType: "Fresh Yeast",
        water: "",
      },
      recipe: {
        water: "",
        yeast: "",
        salt: "",
      },
      pizzaStyleOptions: [
        {
          id: "Napolitan",
          name: "Napolitan",
          thicknessFactor: 0.6,
        },
        {
          id: "New York",
          name: "New York",
          thicknessFactor: 0.59,
        },
        {
          id: "Canoto",
          name: "Canoto",
          thicknessFactor: 0.6,
        },
      ],
      yeastTypeOptions: [
        {
          id: "Fresh Yeast",
          name: "Fresh Yeast",
        },
        {
          id: "Type2",
          name: "Type2",
        },
        {
          id: "Type3",
          name: "Type3",
        },
        {
          id: "Type4",
          name: "Type4",
        },
      ],
    };
  },

  watch: {
    ingredients: {
      deep: true,
      handler() {
        this.userValidity = this.fasle;
      },
    },
  },

  methods: {
    isValid() {
      this.userValidity = true;
    },
  },
  computed: {
    calculatedFlour() {
      const pizzaNumber = parseFloat(this.ingredients.pizzaNumber);
      const pizzaSize = parseFloat(this.ingredients.pizzaSize);

      if (!isNaN(pizzaNumber) && !isNaN(pizzaSize) && this.selectedStyle) {
        const thicknessFactor = this.selectedStyle.thicknessFactor;
        return pizzaNumber * pizzaSize * thicknessFactor;
      }
    },

    selectedStyle() {
      if (this.ingredients.pizzaStyle) {
        return this.pizzaStyleOptions.find(
          (pizzaStyleOption) =>
            pizzaStyleOption.id === this.ingredients.pizzaStyle
        );
      }
    },
    sizeP() {
      if (this.ingredients.pizzaSize > 0 && this.ingredients.pizzaSize <= 229) {
        return "small";
      } else if (
        this.ingredients.pizzaSize >= 230 &&
        this.ingredients.pizzaSize <= 299
      ) {
        return "medium";
      } else {
        return "large";
      }
    },
    Water() {
      return (this.recipe.water =
        (this.calculatedFlour * this.ingredients.water) / 100);
    },
    yeast() {
      const yeastToFlourRatio = 0.0021739130434783;
      this.recipe.yeast = this.calculatedFlour * yeastToFlourRatio;
      return this.recipe.yeast.toFixed(1);
    },
    salt() {
      const flourToSaltRatio = 0.025;
      this.recipe.salt = this.calculatedFlour * flourToSaltRatio;
      return this.recipe.salt.toFixed(1);
    },
    doughPer() {
      return (this.doughPerPizza = this.ingredients.pizzaSize);
    },
    totalD() {
      this.totalDough =
        this.ingredients.pizzaSize * this.ingredients.pizzaNumber;
      return this.totalDough;
    },
  },
});

app.mount("#pizza");
