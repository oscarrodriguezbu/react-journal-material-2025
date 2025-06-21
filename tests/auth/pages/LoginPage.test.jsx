import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice, } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({ //mock de algunos thunks
    startGoogleSignIn: () => mockStartGoogleSignIn, //al hacer este tipo de mock, toca especificar otros thunks si las pruebas lo requiere
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock('react-redux', () => ({// mock para poder trabajar con el useDispatch
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {//siempre para precargar un cierto estado del store mientras tanto
        auth: notAuthenticatedState //esto ayuda a cambiar el estado inicial y sirve para habilitar los botones para simular un clic
    }
});

describe('Pruebas en <LoginPage />', () => {
    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter> {/* Necesario para que pueda renderizarse en memoria */}
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug()
        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });


    test('boton de google debe de llamar el startGoogleSignIn', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');//buscar el boton
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSignIn).toHaveBeenCalled(); //con que se llame es suficiente para hacer la prueba 
    });


    test('submit debe de llamar startLoginWithEmailPassword', () => {
        const email = 'fernando@google.com';
        const password = '123456';

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    });
});
