      var cont = 2;
      $(document).on( "click", "#btnAdd", function(e) {
        insert_html(cont);
        cont++;
      });

      $(document).on("click", ".btnRemove", function(e) {
        const item = $(this).parent().parent().attr('id');
        if (item == cont-1) {
          $(this).parent().parent().remove();
          cont--;
        }
      });

      $(document).on( "click", "#btnCalc", function(e) {
        var porcFinal = 0;
        var promFinal = 0;
        for(i = 1; i < cont; i++){
          const nota = parseInt($(`#txtNota-${i}`).val());
          const porc = parseInt($(`#txtPorc-${i}`).val());

          if(validation_nota(nota)){
            const prom = nota * (porc/100);
            promFinal += prom;
            porcFinal += porc;

            if(porcFinal == 100){
              Swal.fire({
                icon: 'success',
                title: `Tu Promedio es ${promFinal}`
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'El porcentaje debe ser igual a 100%'
              });
            }

          }

        }
      });

      function insert_html(cont) {
        const html = `<div class="row mb-3" id=${cont}>
                      <div class="col">
                        <div class="input-group flex-nowrap">
                          <span class="input-group-text" id="addon-wrapping">Nota</span>
                          <input type="number" class="form-control" placeholder="Nota ${cont}" id="txtNota-${cont}">
                        </div>
                      </div>
                      <div class="col">
                        <div class="input-group flex-nowrap">
                          <span class="input-group-text" id="addon-wrapping">%</span>
                          <input type="number" class="form-control" placeholder="Porcentaje ${cont}" id="txtPorc-${cont}">
                        </div>
                      </div>
                      <div class="col-1">
                        <button type="button" class="btn btn-danger btnRemove">-</button>
                      </div>
                    </div>`;
        $("#form").append(html);
      }

      function validation_nota(nota) {
        var valid = true;
        if(!$.isNumeric(nota)){
          valid = false;
          Swal.fire({
            icon: 'error',
            title: 'Rellene todos los campos'
          });
        }
        if(nota < 10 || nota > 70) {
          valid = false;
          Swal.fire({
            icon: 'error',
            title: 'Rango de nota no valido'
          });
        }
        return valid;
      }