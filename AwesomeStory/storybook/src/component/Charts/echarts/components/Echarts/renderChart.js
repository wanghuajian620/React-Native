import echarts from './echarts.min';
import toString from '../../util/toString';

export default function renderChart(props) { 
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  return `
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
    window.document.addEventListener('message', function(e) {
      var option = JSON.parse(e.data);
      myChart.dispose();

      myChart = echarts.init(document.getElementById('main'), option.theme);
      
      myChart.setOption(option.option);
      myChart.on('click', function(params) {
        for(let pop in params) {
          try{
             JSON.stringify(params[pop]);
          }catch(e){
              delete params[pop];
          }
      }
        window.postMessage(JSON.stringify(params));
      });
    });
    myChart.on('click', function(params) {
      for(let pop in params) {
        try{
           JSON.stringify(params[pop]);
        }catch(e){
            delete params[pop];
        }
    }
      window.postMessage(JSON.stringify(params));
    });
  `;
}
