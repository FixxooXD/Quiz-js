(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        module.exports = {
          API_KEY: "BEXiGL47aq49e6JIjlo8xxSpYDDqOUEQ89QmwBlJ",
        };
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        const Btn = document.getElementById("btn");
        // selected all the options as a one
        const optionBtn = document.querySelectorAll("#option");
        const question = document.querySelector("#question");
        const option1 = document.querySelector(".option-0");
        const option2 = document.querySelector(".option-2");
        const option3 = document.querySelector(".option-3");
        const option4 = document.querySelector(".option-4");
        const category = document.getElementById("category");
        const op1 = document.getElementById("op1");
        // console.log(optionBtn);
        const config = require("../secret.json");

        const MY_KEY = config.API_KEY;
        /* <i class="fa-regular fa-circle-check p-1"></i> */
        /* <i class="fa-regular fa-circle-xmark p-1"></i> */

        // console.log(option0)
        Btn.addEventListener("click", getquiz);

        async function getquiz() {
          const fetchData = await fetch(
            `https://quizapi.io/api/v1/questions?apiKey=${MY_KEY}`
          );

          const data = await fetchData.json();
          console.log(data);
          question.innerHTML = data[0].question;
          // console.log(data[0].answers.answer_b)
          console.log();
          option1.innerHTML = await data[0].answers.answer_a;
          option2.innerHTML = await data[0].answers.answer_b;
          option3.innerHTML = await data[0].answers.answer_c;
          option4.innerHTML = await data[0].answers.answer_d;
          category.innerHTML = await data[0].category;
        }

        optionBtn.forEach((options) => {
          options.addEventListener("click", () => {
            if (options.innerHTML == "while") {
              options.innerHTML +=
                '<i class="fa-regular fa-circle-check p-1"></i>';
            } else {
              options.innerHTML += `<i class="fa-regular fa-circle-xmark p-1"></i>`;
            }
          });
        });
      },
      { "../secret.json": 1 },
    ],
  },
  {},
  [2]
);
