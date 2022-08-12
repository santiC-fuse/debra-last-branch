import axios from "axios";

const callApi = async (url) => {
  const { data } = await axios.get(url);
  const { branch } = data;
  const message = `:point_right:\n**Branch deployed: ${branch}**\n`;
  return message;
};

const getLastBranchDeployed = async (
  projectName,
  environment,
) => {
  try {
    if (!projectName) throw new Error("Project name parameter needed");
    if (!environment) throw new Error("Environment parameter needed");

    const url = `https://${environment}-api.saveupfront.co/v1/api/health`;

    const message = await callApi(url);
    console.log(message);
    return message;
  } catch (error) {
    if (error.message) {
      console.log(error.message);
    }
    if (error.response) {
      console.error(error.response.data.message);
    }
  }
};
const projectNameParam = process.argv[2];
const environmentParam = process.argv[3];

await getLastBranchDeployed(
  projectNameParam,
  environmentParam
);