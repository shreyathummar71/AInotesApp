const Charts = ({ aiSummary }) => {
  const data = {
    labels: aiSummary.labels,
    datasets: [
      {
        label: "Mood Analysis",
        data: aiSummary.data,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  console.log(data);
  return <Bar data={data} />;
};

export default Charts;
