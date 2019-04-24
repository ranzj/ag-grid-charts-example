import {CartesianChart} from "ag-grid-enterprise/src/charts/chart/cartesianChart";
import {CategoryAxis} from "ag-grid-enterprise/src/charts/chart/axis/categoryAxis";
import {NumberAxis} from "ag-grid-enterprise/src/charts/chart/axis/numberAxis";
import {LineSeries} from "ag-grid-enterprise/src/charts/chart/series/lineSeries";
import { BarSeries } from "ag-grid-enterprise/src/charts/chart/series/barSeries";

type CategoryDatum = {
    country: { toString: () => string, id: string },
    value: number,
    other: number
};

const data: CategoryDatum[] = [
    { country: { toString: () => 'France', id: '0' }, value: 3, other: 2 },
    { country: { toString: () => 'Italy', id: '1' }, value: 7, other: 3 },
    { country: { toString: () => 'France', id: '2' }, value: 6, other: 2 },
    { country: { toString: () => 'Italy', id: '3' }, value: 4, other: 5 },
    { country: { toString: () => 'Italy', id: '4' }, value: 8, other: 3 }
];

function createCategoryLineChart() {
    const chart = new CartesianChart<CategoryDatum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = 800;
    chart.height = 500;

    const lineSeries = new LineSeries<CategoryDatum, string, number>();
    lineSeries.lineWidth = 4;
    lineSeries.data = data;
    lineSeries.xField = 'country';
    lineSeries.yField = 'value';
    lineSeries.tooltip = true;
    lineSeries.title = 'Countries';

    chart.series = [lineSeries];
}

function createBarChart() {
    const chart = new CartesianChart<CategoryDatum, string, number>(
        new CategoryAxis(),
        new NumberAxis()
    );
    chart.width = 800;
    chart.height = 500;

    const lineSeries = new BarSeries<CategoryDatum, string, number>();
    lineSeries.lineWidth = 4;
    lineSeries.data = data;
    lineSeries.xField = 'country';
    lineSeries.yFields = ['value', 'other'];
    lineSeries.yFieldNames = ['Countries', 'Whatever'];
    lineSeries.tooltip = true;

    chart.series = [lineSeries];
}

document.addEventListener('DOMContentLoaded', () => {
    createCategoryLineChart();
    createBarChart();
});