import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";

type CategoryDatum = {
    category: string,
    value: number
};

type NumericDatum = {
    xValue: number,
    yValue: number
};

const categoryData: CategoryDatum[] = [
    { category: 'John', value: 3 },
    { category: 'Nige', value: 7 },
    { category: 'Vicky', value: 6 },
    { category: 'Rick', value: 4 },
    { category: 'Lucy', value: 8 },
    { category: 'Ben', value: 5 },
    { category: 'Barbara', value: 6 },
    { category: 'Maria', value: 3 }
];

function generateCategoryData(n = 50): CategoryDatum[] {
    const data: CategoryDatum[] = [];
    for (let i = 0; i < n; i++) {
        const datum: CategoryDatum = {
            category: 'A' + (i + 1),
            value: Math.random() * 10
        };
        data.push(datum);
    }
    return data;
}

function generateSinData(): NumericDatum[] {
    const data: NumericDatum[] = [];
    const step = 0.1;
    for (let i = -10; i < 10; i += step) {
        const datum: NumericDatum = {
            xValue: i,
            yValue: Math.sin(i)
        };
        data.push(datum);
    }
    return data;
}

function generateLogData(): NumericDatum[] {
    const data: NumericDatum[] = [];
    const step = 10;
    for (let i = 1; i < 1000; i += step) {
        const datum: NumericDatum = {
            xValue: i,
            yValue: Math.log(i)
        };
        data.push(datum);
    }
    return data;
}

function generateSpiralData(): NumericDatum[] {
    // r = a + bθ
    // x = r * Math.cos(θ)
    // y = r * Math.sin(θ)
    const a = 1;
    const b = 1;
    const data: NumericDatum[] = [];
    const step = 0.1;
    for (let th = 1; th < 50; th += step) {
        const r = (a + b * th);
        const datum: NumericDatum = {
            xValue: r * Math.cos(th),
            yValue: r * Math.sin(th)
        };
        data.push(datum);
    }
    return data;
}

function createCategoryLineChart() {
    const chart = new CartesianChart<CategoryDatum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = document.body.clientWidth;
    chart.height = 600;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const lineSeries = new LineSeries<CategoryDatum, string, number>();
    lineSeries.lineWidth = 4;
    chart.xAxis.labelRotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.setDataAndFields(categoryData, 'category', 'value');

    document.body.appendChild(document.createElement('br'));

    const saveImageButton = document.createElement('button');
    saveImageButton.textContent = 'Save Chart Image';
    document.body.appendChild(saveImageButton);
    saveImageButton.addEventListener('click', () => {
        chart.scene.download('pie-chart');
    });

    const changeDataButton = document.createElement('button');
    changeDataButton.textContent = 'Change data';
    document.body.appendChild(changeDataButton);
    changeDataButton.addEventListener('click', () => {
        lineSeries.setDataAndFields(generateCategoryData(Math.floor(Math.random() * 50)), 'category', 'value');
    });

    const noDataButton = document.createElement('button');
    noDataButton.textContent = 'No data';
    document.body.appendChild(noDataButton);
    noDataButton.addEventListener('click', () => {
        lineSeries.setDataAndFields([], 'category', 'value');
    });

    const onePointButton = document.createElement('button');
    onePointButton.textContent = 'Single data point';
    document.body.appendChild(onePointButton);
    onePointButton.addEventListener('click', () => {
        lineSeries.setDataAndFields([{
            category: 'One',
            value: 17
        }], 'category', 'value');
    });
}

function createNumericLineChart() {
    document.body.appendChild(document.createElement('br'));

    const chart = new CartesianChart<NumericDatum, number, number>(
        new NumberAxis(),
        new NumberAxis()
    );
    chart.width = 600;
    chart.height = 600;
    chart.padding = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    const lineSeries = new LineSeries<NumericDatum, number, number>();
    lineSeries.lineWidth = 2;
    chart.xAxis.labelRotation = 45;
    chart.addSeries(lineSeries);
    lineSeries.setDataAndFields(generateSinData(), 'xValue', 'yValue');

    document.body.appendChild(document.createElement('br'));

    const saveImageButton = document.createElement('button');
    saveImageButton.textContent = 'Save Chart Image';
    document.body.appendChild(saveImageButton);
    saveImageButton.addEventListener('click', () => {
        chart.scene.download('pie-chart');
    });

    const logDataButton = document.createElement('button');
    logDataButton.textContent = 'Math.log data';
    document.body.appendChild(logDataButton);
    logDataButton.addEventListener('click', () => {
        lineSeries.setDataAndFields(generateLogData(), 'xValue', 'yValue');
    });

    const spiralDataButton = document.createElement('button');
    spiralDataButton.textContent = 'Spiral data';
    document.body.appendChild(spiralDataButton);
    spiralDataButton.addEventListener('click', () => {
        lineSeries.setDataAndFields(generateSpiralData(), 'xValue', 'yValue');
    });

    const animateSinDataButton = document.createElement('button');
    animateSinDataButton.textContent = 'Animate Math.sin data';
    document.body.appendChild(animateSinDataButton);
    animateSinDataButton.addEventListener('click', () => {
        const data: NumericDatum[] = [];
        const step = 0.1;
        let i = -10;

        (function nextFrame() {
            data.push({
                xValue: i,
                yValue: Math.sin(i)
            });
            lineSeries.setDataAndFields(data, 'xValue', 'yValue');

            if (i < 10) {
                i += step;
                requestAnimationFrame(nextFrame);
            }
        })();
    });

    const animateSpiralDataButton = document.createElement('button');
    animateSpiralDataButton.textContent = 'Animate spiral data';
    document.body.appendChild(animateSpiralDataButton);
    animateSpiralDataButton.addEventListener('click', () => {
        const a = 1;
        const b = 1;
        const data: NumericDatum[] = [];
        const step = 0.1;
        let th = 1;

        (function nextFrame() {
            const r = (a + b * th);
            data.push({
                xValue: r * Math.cos(th),
                yValue: r * Math.sin(th)
            });
            lineSeries.setDataAndFields(data, 'xValue', 'yValue');

            if (th < 50) {
                th += step;
                requestAnimationFrame(nextFrame);
            }
        })();
    });

    document.body.appendChild(document.createElement('br'));
    const niceCheckboxLabel = document.createElement('label');
    niceCheckboxLabel.innerHTML = 'Data domain auto-rounding (desirable for static charts but not for animated ones)';
    const niceCheckbox = document.createElement('input');
    niceCheckbox.type = 'checkbox';
    niceCheckbox.checked = true;
    niceCheckboxLabel.appendChild(niceCheckbox);
    document.body.appendChild(niceCheckboxLabel);
    niceCheckbox.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const xAxis = chart.xAxis;
        const yAxis = chart.yAxis;

        if (xAxis instanceof NumberAxis) {
            xAxis.nice = target.checked;
        }
        if (yAxis instanceof NumberAxis) {
            yAxis.nice = target.checked;
        }
        chart.layoutPending = true;
    });

    document.body.appendChild(document.createElement('br'));
    const lineWidthSlider = document.createElement('input');
    lineWidthSlider.type = 'range';
    lineWidthSlider.min = '0';
    lineWidthSlider.max = '10';
    lineWidthSlider.step = '0.5';
    lineWidthSlider.value = '2';
    lineWidthSlider.style.width = '400px';
    document.body.appendChild(lineWidthSlider);
    lineWidthSlider.addEventListener('input', (e) => {
        lineSeries.lineWidth = +(e.target as HTMLInputElement).value;
    });

    document.body.appendChild(document.createElement('br'));
    const markerLineWidthSlider = document.createElement('input');
    markerLineWidthSlider.type = 'range';
    markerLineWidthSlider.min = '0';
    markerLineWidthSlider.max = '10';
    markerLineWidthSlider.step = '0.5';
    markerLineWidthSlider.value = '2';
    markerLineWidthSlider.style.width = '400px';
    document.body.appendChild(markerLineWidthSlider);
    markerLineWidthSlider.addEventListener('input', (e) => {
        lineSeries.markerLineWidth = +(e.target as HTMLInputElement).value;
    });

    document.body.appendChild(document.createElement('br'));
    const markerRadiusSlider = document.createElement('input');
    markerRadiusSlider.type = 'range';
    markerRadiusSlider.min = '0';
    markerRadiusSlider.max = '10';
    markerRadiusSlider.step = '0.5';
    markerRadiusSlider.value = '5';
    markerRadiusSlider.style.width = '400px';
    document.body.appendChild(markerRadiusSlider);
    markerRadiusSlider.addEventListener('input', (e) => {
        lineSeries.markerRadius = +(e.target as HTMLInputElement).value;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
    createNumericLineChart();
});