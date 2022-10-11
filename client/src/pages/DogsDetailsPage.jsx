import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { STATUS, selectDetails, selectStatus } from "../features/appSlice";
import { DashboardWrapper, Spinner } from "../components/GenericComponents";
import {
  DetailsCard,
  DetailsContent,
  DetailsImage,
  DetailsText,
  DetailsTitle,
} from "../components/DogDetailsPageComponents";
import noImage from "../assets/no-image.png";

const DogsDetailsPage = () => {
  const status = useSelector(selectStatus);
  const details = useSelector(selectDetails);

  return status === STATUS.START ? (
    <Navigate to="/" />
  ) : (
    <DashboardWrapper>
      <DetailsCard>
        {!details.id ? (
          <Spinner />
        ) : (
          <>
            <DetailsImage
              src={details.image ? details.image : noImage}
              alt="I owe you a dog"
            />
            <DetailsContent>
              <DetailsTitle>{details.name}</DetailsTitle>
              <DetailsText>
                <strong>Temperaments: </strong>
                {details.temperaments.map((value) => value.name).join(", ")}
              </DetailsText>
              <DetailsText>
                <strong>Weight: </strong>
                {details.weight}
              </DetailsText>
              <DetailsText>
                <strong>Height: </strong>
                {details.height}
              </DetailsText>
              <DetailsText>
                <strong>Life Span: </strong>
                {details.age}
              </DetailsText>
            </DetailsContent>
          </>
        )}
      </DetailsCard>
    </DashboardWrapper>
  );
};

export default DogsDetailsPage;
