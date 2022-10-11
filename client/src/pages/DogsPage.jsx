import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import {
  DogsWrapper,
  DogCard,
  DogImage,
  DogContent,
  DogBreed,
  DogText,
  Footer,
  FooterButton,
  FooterText,
} from "../components/DogsPageComponents";
import { DashboardWrapper } from "../components/GenericComponents";
import {
  FILTER,
  STATUS,
  fillDetails,
  selectStatus,
  selectDogs,
  selectFiltered,
} from "../features/appSlice";
import noImage from "../assets/no-image.png";

const DogsPage = () => {
  const [state, setState] = useState({
    pages: [],
    number: 0,
    notFound: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const filtered = useSelector(selectFiltered);
  const { dogs, filteredDogs } = useSelector(selectDogs);

  const pageSize = 8;

  useEffect(() => {
    setState({
      ...state,
      notFound: false,
    });
    let pagesBuffer = [];
    const dogsBuffer = JSON.parse(
      JSON.stringify(
        filteredDogs.length > 0 || filtered !== FILTER.UNFILTERED
          ? filteredDogs
          : dogs
      )
    );
    if (dogsBuffer.length !== 0) {
      for (let i = 0; i < dogsBuffer.length; i += pageSize)
        pagesBuffer.push(dogsBuffer.slice(i, i + pageSize));
      setState({
        pages: pagesBuffer,
        number: 0,
      });
    } else {
      setState({
        pages: [],
        number: 0,
        notFound: true,
      });
    }
  }, [dogs, filteredDogs]);

  const goToDetails = (id, isLocal) => (e) => {
    e.preventDefault();

    dispatch(fillDetails({ id, isLocal }));
    navigate(`/dashboard/details`);
  };

  const dogsRender = () => {
    return state.pages.length > 0 ? (
      state.pages[state.number].map(
        ({ id, image, name, temperaments, weight, isLocal, key }) => {
          return (
            <DogCard key={key} onClick={goToDetails(id, isLocal)}>
              <DogImage
                src={image === null ? noImage : image}
                alt="I owe you a dog"
              />
              <DogContent>
                <DogBreed>{name}</DogBreed>
                <DogText lineNumber={2}>
                  {temperaments.length === 1
                    ? temperaments[0].name.charAt(0).toUpperCase() +
                      temperaments[0].name.slice(1)
                    : temperaments
                        .map(
                          (temperament) =>
                            temperament.name.charAt(0).toUpperCase() +
                            temperament.name.slice(1)
                        )
                        .join(", ")
                        .split(0, -2)}
                </DogText>
                <DogText>{weight}</DogText>
              </DogContent>
            </DogCard>
          );
        }
      )
    ) : (
      <p>Wrong Way</p>
    );
  };

  return status === STATUS.START ? (
    <Navigate to="/" />
  ) : (
    <DashboardWrapper>
      <DogsWrapper>
        {!state.notFound ? dogsRender() : <h1>Not Found</h1>}
      </DogsWrapper>
      <Footer>
        <FooterButton
          disabled={state.number === 0 || state.notFound}
          onClick={() => setState({ ...state, number: 0 })}
        >
          <FaAngleDoubleLeft />
        </FooterButton>
        <FooterButton
          disabled={state.number === 0 || state.notFound}
          onClick={() => setState({ ...state, number: state.number - 1 })}
        >
          <FaAngleLeft />
        </FooterButton>
        <FooterText>
          {state.notFound
            ? "- - -"
            : `${state.number + 1}/${state.pages.length} Pages`}
        </FooterText>
        <FooterButton
          disabled={state.number + 1 === state.pages.length || state.notFound}
          onClick={() => setState({ ...state, number: state.number + 1 })}
        >
          <FaAngleRight />
        </FooterButton>
        <FooterButton
          disabled={state.number + 1 === state.pages.length || state.notFound}
          onClick={() => setState({ ...state, number: state.pages.length - 1 })}
        >
          <FaAngleDoubleRight />
        </FooterButton>
      </Footer>
    </DashboardWrapper>
  );
};

export default DogsPage;
