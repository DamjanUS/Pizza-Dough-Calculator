const app = Vue.createApp({
  data() {
    return {
      userValidity: false,
      doughPerPizza: "",
      totalDough: "",
      ingredients: {
        pizzaNumber: "4",
        pizzaSize: "250",
        pizzaStyle: "Napolitan",
        yeastType: "Instant Dry Yeast",
        water: "60",
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
          thicknessFactor: 0.613,
        },
        {
          id: "New York",
          name: "New York",
          thicknessFactor: 0.613,
          oilToFlourRatio: 0.03,
          sugarToFlourRatio: 0.01,
        },
        {
          id: "Tonda Romana",
          name: "Tonda Romana",
          thicknessFactor: 0.613,
          oilToFlourRatio: 0.061,
        },
      ],
      yeastTypeOptions: [
        {
          id: "Instant Dry Yeast",
          name: "Инстант Сув Квасец",
        },
        {
          id: "Fresh Yeast",
          name: "Свеж квасец",
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
        const flour = pizzaNumber * pizzaSize * thicknessFactor;
        const flourString = flour.toFixed(1);
        const formattedflour = flourString.replace(/\.0$/, "");
        return formattedflour;
      }
    },

    emptySpace() {
      return (
        this.ingredients.pizzaSize === "" ||
        this.ingredients.pizzaNumber === "" ||
        this.ingredients.water === ""
      );
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
        return "мала";
      } else if (
        this.ingredients.pizzaSize >= 230 &&
        this.ingredients.pizzaSize <= 299
      ) {
        return "средна";
      } else {
        return "голема";
      }
    },
    Water() {
      let water = this.recipe.water;
      water = (this.calculatedFlour * this.ingredients.water) / 100;
      const waterString = water.toFixed(1);
      const formattedwater = waterString.replace(/\.0$/, "");
      return formattedwater;
    },
    yeast() {
      const yeastToFlourRatio = 0.0013;
      let yeast = this.recipe.yeast;
      yeast = this.calculatedFlour * yeastToFlourRatio;
      const yeastString = yeast.toFixed(1);
      const formattedyeast = yeastString.replace(/\.0$/, "");
      return formattedyeast;
    },
    salt() {
      const flourToSaltRatio = 0.03;
      let salt = this.recipe.salt;
      salt = this.calculatedFlour * flourToSaltRatio;
      const saltString = salt.toFixed(1);
      const formattedsalt = saltString.replace(/\.0$/, "");
      return formattedsalt;
    },
    oil() {
      const flour = parseFloat(this.calculatedFlour);
      const selectedStyle = this.selectedStyle;

      if (!isNaN(flour) && selectedStyle) {
        const oil = flour * selectedStyle.oilToFlourRatio;
        const oilString = oil.toFixed(1);
        const formattedOil = oilString.replace(/\.0$/, "");
        return formattedOil;
      }
      return 0;
    },
    sugar() {
      const flour = parseFloat(this.calculatedFlour);
      const selectedStyle = this.selectedStyle;

      if (!isNaN(flour) && selectedStyle) {
        const sugar = flour * selectedStyle.sugarToFlourRatio;
        const sugarString = sugar.toFixed(1);
        const formattedsugar = sugarString.replace(/\.0$/, "");
        return formattedsugar;
      }
      return 0;
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
