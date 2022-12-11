import {
  BugReportType,
  StatusEnum,
  statusTranslated,
} from '@/bug-report/types';
import Collapse from '@/components/Collapse';
import { isoDateToDMY } from '@/utils/date';
import Image from 'next/image';
import React, { ReactNode, useCallback, useMemo } from 'react';

import { Container, MainInfoContainer, SideInfoContainer } from './styles';

interface IBugReportModal {
  bugreport: BugReportType;
}

const BugReportModal = ({ bugreport }: IBugReportModal) => {
  const BtnActions = useCallback(() => {
    if (bugreport.status === StatusEnum.PENDING) {
      return (
        <>
          <button style={{ backgroundColor: '#9BC53D' }}>ACEITAR</button>
          <button style={{ backgroundColor: '#c3423f' }}>REJEITAR</button>
        </>
      );
    }

    if (bugreport.status === StatusEnum.ACCEPT) {
      return (
        <>
          <button style={{ backgroundColor: '#9BC53D' }}>CONCLUIR</button>
        </>
      );
    }

    if (bugreport.status === StatusEnum.DENIED) {
      return (
        <>
          <button style={{ backgroundColor: '#9BC53D' }}>ACEITAR</button>
        </>
      );
    }

    if (bugreport.status === StatusEnum.CLOSED) {
      return (
        <>
          <button style={{ backgroundColor: '#9BC53D' }}>REABRIR</button>
        </>
      );
    }

    return <div />;
  }, [bugreport]);

  return (
    <Container>
      <MainInfoContainer>
        <div className='description'>
          <h2>{bugreport.title}</h2>
          <p>
            {bugreport.description}Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc lectus urna, tristique at fermentum ut,
            vestibulum at mi. Suspendisse potenti. In euismod, urna vitae
            porttitor congue, ipsum augue accumsan nisl, venenatis efficitur leo
            arcu ut quam. Vivamus viverra tempus tellus quis hendrerit.
            Pellentesque non porttitor dui, ut efficitur lacus. Donec in turpis
            sit amet metus interdum volutpat sed in elit. Aliquam purus dui,
            facilisis ac velit semper, tempus lacinia sem. Etiam eget nunc
            consectetur, placerat orci fringilla, laoreet nunc. Duis sodales
            posuere arcu, hendrerit pretium nisl vulputate id. Praesent
            sollicitudin lorem quis lorem sagittis congue. Nullam in congue
            sapien. Nullam elementum lacus erat, quis lobortis purus vehicula a.
            Fusce vitae dui sodales, luctus magna a, tristique libero.
          </p>
        </div>

        <Collapse
          style={{ color: '#2274a5', fontSize: 20, fontWeight: 'bold' }}
          label='Passo-a-passo'
        >
          <div>
            <ol>
              {bugreport.steps.map((step, i) => (
                <li key={i}>{step.description}</li>
              ))}
            </ol>
          </div>
        </Collapse>

        <div className='screenshots'>
          <span>Screenshots</span>
          <div>
            {bugreport.screenshots.map((ss, i) => {
              return (
                <Image
                  key={i}
                  width={140}
                  alt={ss.url}
                  height={100}
                  src={ss.url}
                />
              );
            })}
          </div>
        </div>

        <div className='notes'>
          <span>Anotações</span>
          <div>
            {bugreport.notes.map((note, i) => {
              return <p key={i}>{note.note}</p>;
            })}

            <textarea />
            <button>Adicionar anotação</button>
          </div>
        </div>
      </MainInfoContainer>
      <SideInfoContainer>
        <div className='status'>
          <span>status</span>
          <p>{statusTranslated[bugreport.status]}</p>
        </div>

        <div className='created_by'>
          <span>criado por</span>
          <p>{bugreport.created_by.name}</p>
        </div>

        <div className='created_at'>
          <span>criado em</span>
          <p>{isoDateToDMY(bugreport.created_at)}</p>
        </div>

        <div className='assigned_to'>
          <span>atribuido a</span>
          <p>{bugreport.assigned_to?.name || '-'}</p>
        </div>

        <div className='actions'>{<BtnActions />}</div>
      </SideInfoContainer>
    </Container>
  );
};

export default BugReportModal;
