// src/components/filter-bar.tsx
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type Filter = "all" | "active" | "completed";

type FilterBarProps = {
  filter: Filter;
  sort: "newest" | "oldest";
  onFilterChange: (filter: Filter) => void;
  onSortChange: (sort: "newest" | "oldest") => void;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing(2)};
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${(p) => p.theme.spacing(1)};
  justify-content: center;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid
    ${(p) => (p.active ? p.theme.colors.accent : p.theme.colors.border)};
  border-radius: ${(p) => p.theme.radius.md};
  background: ${(p) =>
    p.active ? p.theme.colors.accent : 'transparent'};
  color: ${(p) => (p.active ? "#1a1a1a" : p.theme.colors.text)};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.sm};
  font-weight: ${(p) => p.theme.font.weight.medium};
  flex: 1;
  max-width: 120px;

  &:hover {
    background: ${(p) =>
      p.active ? p.theme.colors.accentHover : p.theme.colors.border};
    border-color: ${(p) =>
      p.active ? p.theme.colors.accentHover : p.theme.colors.accent};
    color: ${(p) => p.active ? "#1a1a1a" : p.theme.colors.accent};
    transform: translateY(-1px);
  }
`;

const SortSection = styled.div`
  display: flex;
  justify-content: center;
`;

const Select = styled.select`
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radius.sm};
  background: transparent;
  color: ${(p) => p.theme.colors.text};
  font-family: ${(p) => p.theme.font.family};
  font-size: ${(p) => p.theme.font.size.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.accent};
    box-shadow: 0 0 0 2px ${(p) => p.theme.colors.accent}20;
  }

  &:hover {
    border-color: ${(p) => p.theme.colors.accent};
  }
`;

export const FilterBar = (p: FilterBarProps) => {
  return (
    <Wrapper>
      <FilterSection>
        <FilterButton
          active={p.filter === "all"}
          onClick={() => p.onFilterChange("all")}
        >
          Все
        </FilterButton>
        <FilterButton
          active={p.filter === "active"}
          onClick={() => p.onFilterChange("active")}
        >
          Активные
        </FilterButton>
        <FilterButton
          active={p.filter === "completed"}
          onClick={() => p.onFilterChange("completed")}
        >
          Завершённые
        </FilterButton>
      </FilterSection>
      
      <SortSection>
        <Select
          value={p.sort}
          onChange={(e) => p.onSortChange(e.target.value as "newest" | "oldest")}
        >
          <option value="newest"> Сначала новые</option>
          <option value="oldest"> Сначала старые</option>
        </Select>
      </SortSection>
    </Wrapper>
  );
}