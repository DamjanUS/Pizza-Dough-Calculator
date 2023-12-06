const app = Vue.createApp({
  data() {
    return {
      userValidity: false,
      doughPerPizza: "",
      totalDough: "",
      ingredients: {
        pizzaStyle: "Napolitan",
        pizzaNumber: "4",
        pizzaSize: "250",
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
          flourToSaltRatio: 0.03,
        },
        {
          id: "New York",
          name: "New York",
          thicknessFactor: 0.602,
          oilToFlourRatio: 0.03,
          sugarToFlourRatio: 0.01,
          flourToSaltRatio: 0.02,
        },
        {
          id: "Tonda Romana",
          name: "Tonda Romana",
          thicknessFactor: 0.593,
          oilToFlourRatio: 0.06,
          flourToSaltRatio: 0.025,
        },
      ],
      yeastTypeOptions: [
        {
          id: "Instant Dry Yeast",
          name: "Инстант Сув Квасец",
          yeastToFlourRatio: 0.0007,
        },
        {
          id: "Fresh Yeast",
          name: "Свеж квасец",
          yeastToFlourRatio: 0.0019,
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
        const water = parseFloat(this.ingredients.water);

        if (!isNaN(water)) {
          const flour =
            pizzaNumber * pizzaSize * thicknessFactor - (water - 60) * 3.5;
          const adjustedFlour = Math.max(flour, 0);

          const flourString = adjustedFlour.toFixed(1);
          const formattedFlour = flourString.replace(/\.0$/, "");

          return formattedFlour;
        }
      }
      return "";
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
    selectedYeastType() {
      if (this.ingredients.yeastType) {
        return this.yeastTypeOptions.find(
          (yeastTypeOption) => yeastTypeOption.id === this.ingredients.yeastType
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
      const yeastType = this.selectedYeastType;
      const flour = this.calculatedFlour * yeastType.yeastToFlourRatio;
      this.$nextTick(() => {
        if (this.selectedStyle.id === "New York") {
          if (yeastType.id === "Fresh Yeast") {
            yeastType.yeastToFlourRatio = 0.0076;
          } else if (yeastType.id === "Instant Dry Yeast") {
            yeastType.yeastToFlourRatio = 0.0025;
          }
        } else if (this.selectedStyle.id === "Napolitan" || "Tonda Romana") {
          if (yeastType.id === "Fresh Yeast") {
            yeastType.yeastToFlourRatio = 0.0019;
          } else if (yeastType.id === "Instant Dry Yeast") {
            yeastType.yeastToFlourRatio = 0.0007;
          }
        }
      });
      const yeastString = flour.toFixed(1);
      const formattedYeast = yeastString.replace(/\.0$/, "");
      return formattedYeast;
    },
    salt() {
      let salt = this.recipe.salt;
      salt = this.calculatedFlour * this.selectedStyle.flourToSaltRatio;
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
