const salaryUrl = 'http://127.0.0.1:5000/api/salary';
const jobUrl = 'http://127.0.0.1:5000/api/jobinfo';
const wordsUrl = 'http://127.0.0.1:5000/api/words';

function init() {
  let selector = d3.select('#selDataset');
  let startJob;
  d3.json(salaryUrl).then(function(data) {
    const jobTitles = data.map(job => job.Title);
    selector
      .selectAll('option')
      .data(jobTitles)
      .enter()
      .append('option')
      .text(d => d)
      .attr('value', d => d);

    let startJob = jobTitles[0];
    metadata(startJob);

    
  });
  charts();
  cloud();
}
  
/*function metadata(job) 
{
    panel = d3.select('#job-metadata');
    d3.json(salaryUrl).then(function(data) 
    {
      let findJob = data.filter(s => s.Title == job);
      let selectedJob = findJob[0];
      panel.html('');
      Object.entries(selectedJob).forEach(([key, value]) => 
      {
        if (key === "Title")
        {
            panel.insert('p').text(`${key}: ${value}`);
        }
        else
        {
            panel.append('p').text(`${key}: ${value}`);
        }
        
      });
    });
}*/
function metadata(job) 
{
    panel = d3.select('#job-metadata');
    d3.json(jobUrl).then(function(data) 
    {
        let findJob = data.filter(s => s.Title == job);
        let selectedJob = findJob[0];
        panel.html('');
        
        Object.entries(selectedJob).forEach(([key, value]) => {
            if (key === "Link") 
            {
              const linkRegex = /href="(.*?)"/;
              const link = value.match(linkRegex)[1];
              panel.append('p').html(`<a href="${link}" target="_blank">${key}</a>`);
            } 
            else if (key === "Title") 
            {
              panel.insert('p').text(`${key}: ${value}`);
            } 
            else 
            {
              panel.append('p').text(`${key}: ${value}`);
            }
        });
    });
}

function optionChanged(newJob)
{
    metadata(newJob);
}

function charts() 
{
  d3.json(salaryUrl).then(function(data) 
  {
    data.sort((a, b) => b.Max_Salary - a.Max_Salary);
    const topSalaries = data.map(d => d.Max_Salary).slice(0, 10);
    const topJobs = data.map(d => d.Title).slice(0,10);
    const topWords = data.map(d => d['Most common word']).slice(0,10);

    console.log(topSalaries);
    console.log(topJobs);
    console.log(topWords);
    
    let barTrace =
    {
        x:topSalaries,
        y:topJobs,
        text:topWords,
        type:"bar",
        orientation:"h"
    };
    let barData = [barTrace];
    let barLayout = {
        title: 'Top 10 positions by salary',
        margin: {
          l: 275,  // increase the left margin to give more space for the labels
          r: 0,
          b: 50,
          t: 50,
          pad: 4
        },
        height: 500  // increase the height of the chart to make more space for the labels
      };

    Plotly.newPlot('bar',barData,barLayout);
    
  });
  
}


init();
