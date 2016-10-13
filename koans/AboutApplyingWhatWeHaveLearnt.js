var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat1 =
        _.filter(products, function(product) {
          var includesMushrooms = _.any(product.ingredients, function(ingredient) {
            return ingredient === "mushrooms";
          });
          return !includesMushrooms && product.containsNuts === false;
        });

      expect(productsICanEat1.length).toBe(1);

      var productsICanEat2 =
        _.filter(products, function(product) {
          var includesMushrooms = _.contains(product.ingredients, "mushrooms");
          return !includesMushrooms && product.containsNuts === false;
        });
      expect(productsICanEat2.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var numbers = _.range(1000);
    var multiples = _.filter(numbers, function(n) {
      return n % 3 === 0 || n % 5 === 0;
    });
    var sum = _.reduce(multiples, function(memo, n) {
      return memo + n;
    });

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount =
      _.chain(products)
        .map(function(product) {
          return product.ingredients;
        })
        .flatten()
        .reduce(function(count, ingredient) {
          count[ingredient] = (count[ingredient] || 0) + 1;
          return count;
        }, {})
        .value();
    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /* I take a range of numbers from 50 to 0 and I'll loop throught this numbser and
  make a modulo of my number to find the largest which is aslo a prime number */
  it("should find the largest prime factor of a composite number", function () {
    function largestFactor(number) {
      return _.chain(number)
        .range()
        .reverse()
        .find(function(factor) {
          return number % factor == 0 && checkFactorPrime(factor);
        })
        .value();
    };
    function checkFactorPrime(factor) {
      return _.chain(factor)
        .range()
        .reverse()
        .without(0, 1)
        .every(function(number) {
          return factor % number != 0;
        })
        .value();
    };
    expect(largestFactor(51)).toBe(17);
    expect(largestFactor(119)).toBe(17);
    expect(largestFactor(63)).toBe(7);
    expect(largestFactor(125)).toBe(5);
    expect(largestFactor(64)).toBe(2);

    /* I'm looking forward to the lowest number which return 0 in modulo.
    Result of the division is number which I looking.
    szukam najmniejszej liczby przez którą dzieli się bez reszty,
    więc wynik to liczba której szukam*/
    function lowestFactor(number){
      var lowestDivider = _.chain(number)
        .range()
        .without(0, 1)
        .find(function(divider) {
          var reminder = number % divider
          return reminder === 0 && checkFactorPrime(number / divider);
        })
        .value();
      return number / lowestDivider;
    };

    expect(lowestFactor(51)).toBe(17);
    expect(lowestFactor(119)).toBe(17);
    expect(lowestFactor(64)).toBe(2);
  });



  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    /* result is 888888 */
    var palindrome = function() {
      for (var i = 999; i >= 100; i--) {
        for (var j = 999; j >= i; j--) {
          var multiples = i * j;
          var palindrome = parseInt(multiples.toString().split("").reverse().join(""));
          if (multiples === palindrome) {
            return multiples;
          };
        };
      };
    };
    expect(palindrome()).toBe(888888);

    var palindromeFn = function() {
      var candidate = null;

      _.chain(100)
      .range(1000)
      .reverse()
      .find(function(number1) {
        var findValue = _.chain(number1)
          .range(1000)
          .reverse()
          .find(function(number2) {
            candidate = number1 * number2;
            var palindrome = parseInt(candidate.toString().split("").reverse().join(""));
            return candidate === palindrome;
          })
          .value();

        return typeof(findValue) !== "undefined";
      });

      return candidate;
    };
    expect(palindromeFn()).toBe(888888);
  });
/*
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {


  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });

  it("should find the 10001st prime", function () {

  });
  */
});
