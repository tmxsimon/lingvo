from fastapi import APIRouter, Depends, Form, HTTPException, status, UploadFile
from src.dependencies import SessionDep
from .service import (
    create_access_token,
    authenticate_user,
    get_current_user,
    get_users_db,
    create_user_db,
    delete_user_db,
    update_user_db,
)
from .models import User, UserRead

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.post("/token")
async def login_for_access_token(
    username: str = Form(...),
    password: str = Form(...),
    session = SessionDep
):
    user = authenticate_user(session, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserRead)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/", response_model=list[UserRead])
async def get_users(session = SessionDep):
    users = get_users_db(session)

    if users is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No users found",
        )
    return users

@router.post("/", response_model=UserRead)
async def create_user(
    username: str = Form(...),
    password: str = Form(...),
    image: UploadFile | None = None,
    session = SessionDep
):
    user = create_user_db(
        session=session,
        username=username,
        password=password,
        image=image
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not created"
        )
    
    return user

@router.delete("/{id}", response_model=UserRead)
async def delete_user(id: int, session = SessionDep):
    user = delete_user_db(session, id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return user


@router.put("/{id}", response_model=UserRead)
async def update_user(
    id: int,
    username: str = Form(...),
    image: UploadFile | None = None,
    session = SessionDep
):
    user = update_user_db(
        session=session,
        id=id,
        username=username,
        image=image
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user