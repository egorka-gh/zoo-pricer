<template>
  <div class="panel-body">
    <h2>Настройки</h2>
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <div>Версии данных {{lastSync}}</div>
  </div>
</template>

<script>
//import Vue from 'vue'
const log = require('electron-log');
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
const settings = require('electron').remote.require('electron-settings');


export default {
  mounted: function(){
    log.info('Config mounted');
    //model = settings.getAll();
  },
  methods:{
      onForm: function() {
        this.$emit('new-config',this.model);
        /*
        settings.setAll(this.model);
        //apply config
        try {
          this.$store.dispatch('applyConfig', settings.getAll())
            //TODO must be .then(this.$store.dispatch('sync', settings.get('sync')));
            this.$store.dispatch('sync', settings.get('sync'))
        } catch (error) {
            log.error(error);
        }
        this.$router.replace('home');
        */
      }
  }, 
  components: {
		"vue-form-generator": VueFormGenerator.component
  }, 
  computed: {
    lastSync () {
      return 'Цены: '+settings.get('sync.price')+'; Реклама: '+settings.get('sync.ads');
    }
  },
  data () {
    return {
      model: settings.getAll(),
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'ID магазина',
            model: 'app.id',
            required: true,
            validator: "string"
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Рабочая папка',
            model: 'app.folder',
            hint: 'Папка данных приложения',
            required: true,
            validator: "string"
          }
        ],
        groups: 
        [ 
          {
            id: "ftp",
            legend: "FTP",
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Host',
                model: 'ftp.host',
                required: true,
                validator: "string"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Порт',
                model: 'ftp.port',
                min: 1,
                required: true,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Пользователь',
                model: 'ftp.user',
                required: true,
                validator: "string"
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Пароль',
                model: 'ftp.pass',
                required: true,
                validator: "string"
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Папка',
                model: 'ftp.folder',
                hint: "(не включая ID магазина)",
                required: true,
                validator: "string"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Интервал проверки (мин)',
                model: 'ftp.interval',
                min: 20,
                required: true,
                validator: "integer"
              }
            ]
          },
          {
            legend: "Реклама",
            fields: [
              {
                type: 'input',
                inputType: 'number',
                label: 'Интервал показа (сек)',
                model: 'ads.interval',
                min: 3,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Количество элементов на экране',
                model: 'ads.items',
                min:1,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Высота секции',
                model: 'ads.height',
                min:100,
                validator: "integer"
              }
            ]
          },
          {
            legend: "Размеры шрифтов",
            fields: [
              {
                type: 'input',
                inputType: 'number',
                label: 'Основной',
                model: 'font.body',
                min: 3,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Группа',
                model: 'font.group1',
                min: 3,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Группа описание',
                model: 'font.group2',
                min: 3,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Бренд',
                model: 'font.brand1',
                min: 3,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Бренд страна',
                model: 'font.brand2',
                min: 3,
                validator: "integer"
              },
              {
                type: 'input',
                inputType: 'number',
                label: 'Разделитель групп',
                model: 'font.gap',
                min: 3,
                validator: "integer"
              }
            ]
          },
          {
            fields: [
              {
                type: "submit",
                id: 'btSub',
                label: "",
                buttonText: "Сохранить",
                validateBeforeSubmit: true,
                onSubmit: this.onForm,
                buttons:[
                  {
                    label: 'Отмена',
                    onclick: function(){
                      this.$router.replace('home');
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        validateAsync: true
      }
    }
  }
}
</script>

<style >
.panel-body {
  margin: 1vw 1vw 1vw 2vw;
}
.form-group {
  margin-left: 1vw;
  display: block;
}
.form-group:not([class*=" col-"]) {
  width: 600px;
}
fieldset {
  border-style: none;
}
legend {
  font-weight: 800;
}
</style>